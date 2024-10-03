export const campaigns = [
    { id: 1, name: 'Welcome Series', status: 'Active', sentEmails: 1000, openRate: 25, replyRate: 5 },
    { id: 2, name: 'Re-engagement', status: 'Paused', sentEmails: 500, openRate: 20, replyRate: 3 },
    { id: 3, name: 'Product Announcement', status: 'Draft', sentEmails: 0, openRate: 0, replyRate: 0 },
    { id: 4, name: 'Newsletter', status: 'Active', sentEmails: 2000, openRate: 30, replyRate: 2 },
    { id: 5, name: 'Webinar Invitation', status: 'Completed', sentEmails: 800, openRate: 35, replyRate: 8 },
]

export const uniboxMessages = [
    { id: 1, from: 'john@example.com', subject: 'Interested in your product', date: '2023-06-05', campaign: 'Welcome Series' },
    { id: 2, from: 'sarah@example.com', subject: 'Quick question', date: '2023-06-04', campaign: 'Re-engagement' },
    { id: 3, from: 'mike@example.com', subject: 'Following up', date: '2023-06-03', campaign: 'Product Announcement' },
    { id: 4, from: 'emily@example.com', subject: 'Feedback on newsletter', date: '2023-06-02', campaign: 'Newsletter' },
    { id: 5, from: 'david@example.com', subject: 'Cannot attend webinar', date: '2023-06-01', campaign: 'Webinar Invitation' },
]

export const crmContacts = [
    { id: 1, name: 'John Doe', email: 'john@example.com', company: 'ABC Corp', status: 'Lead' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', company: 'XYZ Inc', status: 'Customer' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', company: '123 LLC', status: 'Prospect' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', company: 'Tech Solutions', status: 'Customer' },
    { id: 5, name: 'David Wilson', email: 'david@example.com', company: 'Global Innovations', status: 'Lead' },
]

export const opportunities = [
    { id: 1, name: 'New contract', value: 10000, stage: 'Proposal', probability: 60 },
    { id: 2, name: 'Upsell existing customer', value: 5000, stage: 'Negotiation', probability: 80 },
    { id: 3, name: 'Partnership deal', value: 25000, stage: 'Discovery', probability: 30 },
    { id: 4, name: 'Product expansion', value: 15000, stage: 'Closing', probability: 90 },
    { id: 5, name: 'New market entry', value: 50000, stage: 'Qualification', probability: 20 },
]

export const analyticsData = [
    { name: 'Welcome Series', sent: 1000, opened: 250, replied: 50 },
    { name: 'Re-engagement', sent: 500, opened: 100, replied: 15 },
    { name: 'Product Announcement', sent: 750, opened: 180, replied: 30 },
    { name: 'Newsletter', sent: 2000, opened: 600, replied: 40 },
    { name: 'Webinar Invitation', sent: 800, opened: 280, replied: 64 },
]

export const tasks = [
    { id: 1, title: "Follow up with John Doe", completed: false },
    { id: 2, title: "Prepare presentation for meeting", completed: true },
    { id: 3, title: "Send proposal to XYZ Corp", completed: false },
    { id: 4, title: "Review campaign performance", completed: false },
    { id: 5, title: "Update CRM with new leads", completed: false },
]

export const websiteAnalytics = [
    { name: "Jan", visits: 1000 },
    { name: "Feb", visits: 1200 },
    { name: "Mar", visits: 900 },
    { name: "Apr", visits: 1500 },
    { name: "May", visits: 1700 },
    { name: "Jun", visits: 1400 },
]