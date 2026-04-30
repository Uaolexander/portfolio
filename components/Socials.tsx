import { Send, Mail } from 'lucide-react';

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/Uaolexander',
    icon: <GithubIcon size={18} />,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/alexvdovych/',
    icon: <InstagramIcon size={18} />,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/alexvdovych',
    icon: <Send size={18} strokeWidth={1.5} />,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/48791576004',
    icon: <WhatsAppIcon size={18} />,
  },
  {
    label: 'Email',
    href: 'mailto:uaolexander99@gmail.com',
    icon: <Mail size={18} strokeWidth={1.5} />,
  },
];

export function Socials() {
  return (
    <div className="flex items-center gap-5">
      {links.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
          className="text-text-low hover:text-text transition-colors duration-150"
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
