-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Function to call the notify-lead Edge Function
CREATE OR REPLACE FUNCTION notify_lead_webhook()
RETURNS TRIGGER AS $$
DECLARE
  payload JSONB;
  edge_function_url TEXT := 'https://ddizkruiddtrzfbmbkms.supabase.co/functions/v1/notify-lead';
BEGIN
  -- Build the webhook payload
  payload := jsonb_build_object(
    'type', TG_OP,
    'table', TG_TABLE_NAME,
    'schema', TG_TABLE_SCHEMA,
    'record', row_to_json(NEW),
    'old_record', CASE WHEN TG_OP = 'UPDATE' THEN row_to_json(OLD) ELSE NULL END
  );

  -- Call the Edge Function via HTTP (no auth needed, deployed with --no-verify-jwt)
  PERFORM net.http_post(
    url := edge_function_url,
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := payload
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on leads table for INSERT
DROP TRIGGER IF EXISTS on_lead_created ON leads;
CREATE TRIGGER on_lead_created
  AFTER INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION notify_lead_webhook();

-- Add comment for documentation
COMMENT ON FUNCTION notify_lead_webhook() IS 'Sends notification email when new lead is created via Edge Function';
