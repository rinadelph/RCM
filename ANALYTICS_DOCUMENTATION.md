# Analytics Dashboard Documentation

## Overview

This document provides comprehensive guidance on the analytics dashboard components, their purpose, and how they interact with each other. It aims to facilitate future development and maintenance of the analytics features in our application.

## File Location

This documentation is located at `docs/google-analytics/analytics-dashboard.md`. Please update this path if the file is moved in the future.

## Components Structure

1. `AnalyticsPage` (app/analytics/page.tsx)
   - Main container for all analytics components
   - Uses AnalyticsContext for data management

2. `AnalyticsContext` (app/contexts/AnalyticsContext.tsx)
   - Manages the state of analytics data
   - Provides data to child components

3. Chart Components (app/components/analytics/*)
   - `PageViewsChart`: Displays page view data over time
   - `EventsChart`: Shows various events tracked in the application
   - `TopPagesChart`: Presents the most visited pages
   - `UserAcquisitionChart`: Illustrates how users are acquired
   - `UserBehaviorChart`: Visualizes user behavior patterns
   - `TopDomainsChart`: Shows top referring domains
   - `TopPagesViewsChart`: Displays pages with the most views
   - `WorstPerformingPagesChart`: Highlights pages with poor performance metrics

4. `DateRangeSelector` (app/components/analytics/DateRangeSelector.tsx)
   - Allows users to select different date ranges for analytics data
   - Options include predefined ranges (e.g., last 7 days, last month) and custom date selection

5. `GoogleAccountSelector` (app/components/GoogleAccountSelector.tsx)
   - Allows users to select different Google accounts for analytics data
   - Ensures proper authentication and access to Google Analytics data

## Data Flow

1. User selects a Google account and date range
2. AnalyticsContext fetches data from the API
3. Data is distributed to individual chart components
4. Charts render based on the provided data

## API Routes

1. `/api/analytics` (app/api/analytics.ts)
   - Fetches Google Analytics data
   - Accepts date range as a query parameter
   - Returns formatted data for all chart components

2. `/api/analytics/update` (app/api/analytics/update/route.ts)
   - Updates stored analytics data
   - Used for background data refresh and caching

## Key Files and Their Purposes

1. `app/analytics/page.tsx`: Main analytics page component
   - Renders all analytics components
   - Manages state for account selection and date range

2. `app/components/analytics/*`: Individual chart components
   - Each file corresponds to a specific chart or metric display
   - Responsible for rendering and updating based on provided data

3. `app/contexts/AnalyticsContext.tsx`: Context for managing analytics data
   - Provides a centralized state management solution
   - Handles data fetching and distribution to components

4. `app/api/analytics.ts`: API route for fetching analytics data
   - Interfaces with Google Analytics API
   - Processes and formats raw data for frontend consumption

5. `app/api/analytics/update/route.ts`: API route for updating analytics data
   - Handles periodic data updates
   - Manages data caching to improve performance

## Adding New Analytics Components

1. Create a new component in `app/components/analytics/`
2. Define the component's props interface
3. Implement the component using react-chartjs-2 or other visualization libraries
4. Import and add the new component to the JSX structure in `app/analytics/page.tsx`

## Customizing Date Ranges

To add or modify date range options:
1. Update the `DateRangeSelector` component
2. Modify the `fetchAnalyticsData` function in `AnalyticsContext`
3. Update the API route to handle the new date range

## Error Handling and Loading States

- Each chart component should handle its own loading and error states
- The `AnalyticsPage` component handles overall loading and error states
- Implement error boundaries to gracefully handle and display errors

## Future Improvements

1. Implement caching for analytics data to reduce API calls
2. Add more granular date range selection (e.g., custom date picker)
3. Implement user-specific dashboard layouts
4. Add export functionality for analytics data
5. Optimize performance by memoizing components or using React.memo where appropriate

## Troubleshooting

If you encounter issues with the analytics dashboard:

1. Check the browser console for any JavaScript errors
2. Verify that the Google Analytics API credentials are correct and up-to-date
3. Ensure that the selected Google account has access to the desired analytics properties
4. Check network requests to confirm data is being fetched correctly
5. Verify that date ranges are properly formatted and valid
6. Use console.log statements or browser developer tools to debug data flow within components
7. Check for any type mismatches, especially when using TypeScript
8. Verify that all required dependencies are installed and up-to-date

## Updating Documentation

When making changes to the analytics dashboard:
1. Update this documentation file to reflect new components, data flows, or API changes
2. Add inline comments to complex code sections for better code maintainability
3. Update any relevant README files, especially if new setup steps are required
4. Document any new environment variables or configuration settings

## Best Practices

1. Always test changes thoroughly to ensure data is displayed correctly
2. Keep components modular and focused on a single responsibility
3. Use TypeScript interfaces to ensure type safety when passing props
4. Comment your code, especially for complex logic or data transformations
5. Follow consistent naming conventions for components, functions, and variables
6. Optimize performance by memoizing components or using React.memo where appropriate
7. Implement error boundaries to gracefully handle and display errors

By keeping this documentation up-to-date and following these best practices, we can ensure that future development and maintenance of the analytics dashboard will be smoother and more efficient.