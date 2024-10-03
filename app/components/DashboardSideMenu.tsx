import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/analytics', label: 'Website Analytics' },
  { href: '/analytics/badpages', label: 'Underperforming Pages' },
  { href: '/email', label: 'Email Dashboard' },
  { href: '/tasks', label: 'Tasks' },
  { href: '/customers', label: 'Customer List' },
  { href: '/settings', label: 'Settings' },
];

export default function DashboardSideMenu() {
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