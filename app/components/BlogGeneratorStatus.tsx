import React, { useState } from 'react';

const BlogGeneratorStatus: React.FC = () => {
  const [selectedBlog, setSelectedBlog] = useState('All Blogs');
  const [dateRange, setDateRange] = useState('Last 7 days');

  const blogs = ['All Blogs', 'Blog 1', 'Blog 2'];
  const dateRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days'];

  const [blogData, setBlogData] = useState([
    { id: 1, property: 'Blog 1', lastPost: '2023-04-14', status: 'Published', webhook: 'https://blog1.com/webhook', postsThisWeek: 3 },
    { id: 2, property: 'Blog 2', lastPost: '2023-04-13', status: 'Scheduled', webhook: 'https://blog2.com/webhook', postsThisWeek: 2 },
  ]);

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Blog Generator Status</h2>
        <div className="flex space-x-2">
          <select 
            value={selectedBlog} 
            onChange={(e) => setSelectedBlog(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            aria-label="Select Blog"
          >
            {blogs.map(blog => (
              <option key={blog} value={blog}>{blog}</option>
            ))}
          </select>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            aria-label="Select Date Range"
          >
            {dateRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex-grow overflow-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Property</th>
              <th className="px-2 py-1 text-left">Last Post</th>
              <th className="px-2 py-1 text-left">Status</th>
              <th className="px-2 py-1 text-left">Webhook</th>
              <th className="px-2 py-1 text-left">Posts This Week</th>
            </tr>
          </thead>
          <tbody>
            {blogData.map(blog => (
              <tr key={blog.id}>
                <td className="border px-2 py-1">{blog.property}</td>
                <td className="border px-2 py-1">{blog.lastPost}</td>
                <td className="border px-2 py-1">{blog.status}</td>
                <td className="border px-2 py-1">{blog.webhook}</td>
                <td className="border px-2 py-1">{blog.postsThisWeek}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogGeneratorStatus;