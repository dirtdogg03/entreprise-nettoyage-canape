// Supabase Edge Function: notify-lead
// Triggered by Database Webhook on leads table INSERT
// Sends email notification via Resend

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const NOTIFICATION_EMAIL = Deno.env.get('NOTIFICATION_EMAIL') || 'contact@nettoyage-canape-a-domicile.fr';

interface Lead {
  id: string;
  service: string;
  city: string | null;
  postal_code: string | null;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  wants_waitlist: boolean;
  status: string;
  created_at: string;
}

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  record: Lead;
  schema: string;
  old_record: Lead | null;
}

const handler = async (request: Request): Promise<Response> => {
  try {
    // Parse webhook payload
    const payload: WebhookPayload = await request.json();

    // Only process INSERT events
    if (payload.type !== 'INSERT') {
      return new Response(JSON.stringify({ message: 'Ignored non-INSERT event' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const lead = payload.record;

    // Format date in French
    const date = new Date(lead.created_at);
    const formattedDate = date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Build email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1a5f4a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #1a5f4a; }
    .value { margin-top: 5px; }
    .cta { background: #1a5f4a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
    .footer { text-align: center; padding: 15px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nouveau Lead !</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Service demande</div>
        <div class="value">${lead.service}</div>
      </div>
      <div class="field">
        <div class="label">Client</div>
        <div class="value">${lead.name}</div>
      </div>
      <div class="field">
        <div class="label">Telephone</div>
        <div class="value"><a href="tel:${lead.phone}">${lead.phone}</a></div>
      </div>
      ${lead.email ? `
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${lead.email}">${lead.email}</a></div>
      </div>
      ` : ''}
      ${lead.city ? `
      <div class="field">
        <div class="label">Ville</div>
        <div class="value">${lead.city}${lead.postal_code ? ` (${lead.postal_code})` : ''}</div>
      </div>
      ` : ''}
      ${lead.message ? `
      <div class="field">
        <div class="label">Message</div>
        <div class="value">${lead.message}</div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">Date de reception</div>
        <div class="value">${formattedDate}</div>
      </div>
      <a href="https://supabase.com/dashboard/project/ddizkruiddtrzfbmbkms/editor" class="cta">
        Voir dans Supabase
      </a>
    </div>
    <div class="footer">
      Nettoyage Canape a Domicile - Notification automatique
    </div>
  </div>
</body>
</html>
    `;

    // Send email via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Nettoyage Canape <onboarding@resend.dev>',
        to: [NOTIFICATION_EMAIL],
        subject: `Nouveau lead: ${lead.name} - ${lead.service}`,
        html: emailHtml,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend API error:', data);
      return new Response(JSON.stringify({ error: 'Failed to send email', details: data }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Email sent successfully:', data);
    return new Response(JSON.stringify({ success: true, emailId: data.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

Deno.serve(handler);
