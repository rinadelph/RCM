import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
    const session = await getSession({ req })

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const { id } = req.query

    if (req.method === 'GET') {
        // Logic to get a specific customer
        // This is a mock response. In a real application, you'd fetch this from a database.
        res.status(200).json({ customer: { id, name: 'Acme Corp', email: 'info@acme.com', status: 'Active' } })
    } else if (req.method === 'PUT') {
        // Logic to update a customer
        const { name, email, status } = req.body
        // In a real application, you'd update this in a database
        res.status(200).json({ message: 'Customer updated', customer: { id, name, email, status } })
    } else if (req.method === 'DELETE') {
        // Logic to delete a customer
        // In a real application, you'd delete this from a database
        res.status(200).json({ message: 'Customer deleted', id })
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}