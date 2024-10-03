import Link from 'next/link';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <nav>
        <Link href="/analytics">Analytics</Link>
        <Link href="/settings">Settings</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;