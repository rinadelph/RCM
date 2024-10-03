import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
    const session = await getSession({ req })

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    if (req.method === 'GET') {
        // Logic to list all customers
        // This is a mock response. In a real application, you'd fetch this from a database.
        res.status(200).json({
            customers: [
                { id: 1, name: 'Acme Corp', email: 'info@acme.com', status: 'Active' },
                { id: 2, name: 'Globex Corp', email: 'info@globex.com', status: 'Inactive' },
            ]
        })
    } else if (req.method === 'POST') {
        // Logic to create a new customer
        const { name, email, status } = req.body
        // In a real application, you'd save this to a database
        res.status(201).json({ message: 'Customer created', customer: { name, email, status } })
    } else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}