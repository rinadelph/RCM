import Link from 'next/link'

export default function Home() {
  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to AI Web Solutions CRM</h1>
      <nav className="space-y-2">
        <Link href="/dashboard" className="text-blue-500 hover:underline block">
          Dashboard
        </Link>
        <Link href="/settings" className="text-blue-500 hover:underline block">
          Settings
        </Link>
      </nav>
    </main>
  )
}