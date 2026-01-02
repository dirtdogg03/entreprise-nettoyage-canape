'use client';

import { motion } from 'framer-motion';
import { company } from '@/lib/data/company';

interface PhoneButtonProps {
  variant?: 'default' | 'compact' | 'hero' | 'outline';
  showText?: boolean;
  className?: string;
  trackingLabel?: string;
}

export default function PhoneButton({
  variant = 'default',
  showText = true,
  className = '',
  trackingLabel = 'phone_click',
}: PhoneButtonProps) {
  const phoneNumber = company.phone.replace(/\s/g, '');

  const handleClick = () => {
    // Analytics tracking (if gtag is available)
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('event', 'click', {
        event_category: 'Contact',
        event_label: trackingLabel,
        value: 1,
      });
    }

    // Also track with custom event for other analytics
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('phone_click', {
          detail: { label: trackingLabel, phone: company.phone },
        })
      );
    }
  };

  const baseStyles = {
    default:
      'bg-slate-deep text-white hover:bg-slate-deep/90 px-5 py-3 rounded-xl',
    compact: 'bg-slate-deep text-white hover:bg-slate-deep/90 px-3 py-2 rounded-lg text-sm',
    hero: 'bg-white text-slate-deep hover:bg-gray-100 px-6 py-4 rounded-xl shadow-lg',
    outline:
      'bg-transparent border-2 border-slate-deep text-slate-deep hover:bg-slate-deep hover:text-white px-5 py-3 rounded-xl',
  };

  const iconSizes = {
    default: 'w-5 h-5',
    compact: 'w-4 h-4',
    hero: 'w-6 h-6',
    outline: 'w-5 h-5',
  };

  return (
    <motion.a
      href={`tel:${phoneNumber}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        transition-colors duration-200
        ${baseStyles[variant]}
        ${className}
      `}
      aria-label={`Appeler ${company.phone}`}
    >
      {/* Phone Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={iconSizes[variant]}
      >
        <path
          fillRule="evenodd"
          d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
          clipRule="evenodd"
        />
      </svg>

      {/* Text */}
      {showText && (
        <span className={variant === 'hero' ? 'hidden sm:inline' : ''}>
          {variant === 'compact' ? company.phone : `Appeler ${company.phone}`}
        </span>
      )}

      {/* Mobile: show number only on hero variant */}
      {variant === 'hero' && showText && (
        <span className="sm:hidden">{company.phone}</span>
      )}
    </motion.a>
  );
}

// Floating variant for fixed positioning
export function FloatingPhoneButton({ className = '' }: { className?: string }) {
  const phoneNumber = company.phone.replace(/\s/g, '');

  return (
    <motion.a
      href={`tel:${phoneNumber}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`
        fixed bottom-24 right-4 z-30
        w-14 h-14 rounded-full
        bg-slate-deep text-white
        flex items-center justify-center
        shadow-lg hover:shadow-xl
        transition-shadow duration-200
        md:hidden
        ${className}
      `}
      aria-label={`Appeler ${company.phone}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
          clipRule="evenodd"
        />
      </svg>
    </motion.a>
  );
}
