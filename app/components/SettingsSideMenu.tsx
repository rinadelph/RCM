import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/settings', label: 'User Info' },
  { href: '/settings/google', label: 'Google' },
  { href: '/settings/clarity', label: 'Clarity' },
  { href: '/settings/ai', label: 'AI' },
  { href: '/settings/cold-email', label: 'Cold Email' },
  { href: '/settings/blog-generator', label: 'Blog Generator' },
  { href: '/dashboard', label: 'Back to Dashboard' },
];

export default function SettingsSideMenu() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`block px-4 py-2 rounded-md ${
            pathname === item.href
              ? 'bg-gray-200 text-gray-900'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}