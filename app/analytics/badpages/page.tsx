'use client';

import { useState, useEffect } from 'react';

interface BlogPage {
  url: string;
  title: string;
  views: number;
  lastUpdated: string;
  averageTimeOnPage: number;
}

export default function UnderperformingPagesPage() {
  const [pages, setPages] = useState<BlogPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch this data from your analytics API
    const fetchData = async () => {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dummyData: BlogPage[] = [
        { url: '/blog/post-1', title: 'How to improve SEO', views: 50, lastUpdated: '2023-08-15', averageTimeOnPage: 45 },
        { url: '/blog/post-2', title: 'Top 10 marketing strategies', views: 30, lastUpdated: '2023-07-20', averageTimeOnPage: 30 },
        { url: '/blog/post-3', title: 'The future of AI in business', views: 20, lastUpdated: '2023-06-10', averageTimeOnPage: 20 },
        // Add more dummy data as needed
      ];

      setPages(dummyData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const sortedPages = pages.sort((a, b) => a.views - b.views);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Underperforming Blog Pages</h1>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">URL</th>
            <th className="px-4 py-2 text-left">Views</th>
            <th className="px-4 py-2 text-left">Last Updated</th>
            <th className="px-4 py-2 text-left">Avg. Time on Page (s)</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedPages.map((page) => (
            <tr key={page.url} className="border-t">
              <td className="px-4 py-2">{page.title}</td>
              <td className="px-4 py-2">{page.url}</td>
              <td className="px-4 py-2">{page.views}</td>
              <td className="px-4 py-2">{page.lastUpdated}</td>
              <td className="px-4 py-2">{page.averageTimeOnPage}</td>
              <td className="px-4 py-2">
                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}