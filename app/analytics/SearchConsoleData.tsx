import React, { useState, useEffect } from 'react';
import { log } from '@/utils/logger';

interface SearchConsoleDataProps {
  siteUrl: string;
}

interface SearchConsoleData {
  performanceData: {
    rows: Array<{
      keys: string[];
      clicks: number;
      impressions: number;
      ctr: number;
      position: number;
    }>;
  };
  sitemapsData: {
    sitemap: Array<{
      path: string;
      lastSubmitted: string;
      isPending: boolean;
      isSitemapsIndex: boolean;
      lastDownloaded: string;
      warnings: string;
      errors: string;
    }>;
  };
  urlInspectionData: {
    inspectionResult: {
      indexStatusResult: {
        coverageState: string;
        robotsTxtState: string;
        indexingState: string;
        lastCrawlTime: string;
        pageFetchState: string;
        googleCanonical: string;
      };
      mobileUsabilityResult: {
        verdict: string;
        issues: string[];
      };
      richResultsResult: {
        detectedItems: Array<{
          types: string[];
        }>;
      };
    };
  };
}

const SearchConsoleData: React.FC<SearchConsoleDataProps> = ({ siteUrl }) => {
  const [data, setData] = useState<SearchConsoleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        // Make sure siteUrl is the actual URL, not the service ID
        const response = await fetch(`/api/search-console?siteUrl=${encodeURIComponent(siteUrl)}&startDate=${startDate}&endDate=${endDate}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Search Console data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        log('Error fetching Search Console data:', err);
        setError('Failed to load Search Console data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (siteUrl) {
      fetchData();
    }
  }, [siteUrl]);

  if (loading) return <div>Loading Search Console data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No Search Console data available.</div>;

  return (
    <div>
      <h2>Search Console Data</h2>
      <h3>Performance Data</h3>
      <table>
        <thead>
          <tr>
            <th>Query</th>
            <th>Clicks</th>
            <th>Impressions</th>
            <th>CTR</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {data.performanceData.rows.map((row, index) => (
            <tr key={index}>
              <td>{row.keys[0]}</td>
              <td>{row.clicks}</td>
              <td>{row.impressions}</td>
              <td>{(row.ctr * 100).toFixed(2)}%</td>
              <td>{row.position.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Sitemaps Data</h3>
      <ul>
        {data.sitemapsData.sitemap.map((sitemap, index) => (
          <li key={index}>
            {sitemap.path} - Last Submitted: {sitemap.lastSubmitted}
          </li>
        ))}
      </ul>
      <h3>URL Inspection Data</h3>
      <p>Coverage State: {data.urlInspectionData.inspectionResult.indexStatusResult.coverageState}</p>
      <p>Indexing State: {data.urlInspectionData.inspectionResult.indexStatusResult.indexingState}</p>
      <p>Mobile Usability: {data.urlInspectionData.inspectionResult.mobileUsabilityResult.verdict}</p>
    </div>
  );
};

export default SearchConsoleData;