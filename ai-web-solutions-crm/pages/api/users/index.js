import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
    const session = await getSession({ req })

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    if (req.method === 'GET') {
        // Logic to list all users
        // This is a mock response. In a real application, you'd fetch this from a database.
        res.status(200).json({
            users: [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
            ]
        })
    } else if (req.method === 'POST') {
        // Logic to create a new user
        const { name, email } = req.body
        // In a real application, you'd save this to a database
        res.status(201).json({ message: 'User created', user: { name, email } })
    } else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}