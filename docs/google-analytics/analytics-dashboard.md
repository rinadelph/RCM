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

## Troubleshooting

If you encounter issues with the analytics dashboard:

1. Check the browser console for any JavaScript errors
2. Verify that the Google Analytics API credentials are correct and up-to-date
3. Ensure that the selected Google account has access to the desired analytics properties
4. Check network requests to confirm data is being fetched correctly
5. Verify that date ranges are properly formatted and valid

## Updating Documentation

When making changes to the analytics dashboard:
1. Update this documentation file to reflect new components, data flows, or API changes
2. Add inline comments to complex code sections for better code maintainability
3. Update any relevant README files, especially if new setup steps are required
4. Document any new environment variables or configuration settings

By keeping this documentation up-to-date, we can ensure that future development and maintenance of the analytics dashboard will be smoother and more efficient.

## Editing Analytics Pages and Components

### Overview
The analytics functionality in our application is built using various components that can be customized and rearranged. The main analytics page is located at `app/analytics/page.tsx`, and it imports and displays several child components.

### Modifying the Analytics Page 

1. **Location**: The main analytics page is located at `app/analytics/page.tsx`.

2. **Adding or Removing Components**:
   - To add a new component, import it at the top of the file and add it to the JSX structure within the return statement.
   - To remove a component, delete its import statement and remove it from the JSX structure.

   Example of removing a component:
   ```typescript
   // Remove this import
   // import PageViewsChart from '@/app/components/analytics/PageViewsChart';

   // ... later in the JSX
   {/* Remove this component */}
   {/* <PageViewsChart data={analyticsData.pageViewsData || []} /> */}
   ```

3. **Rearranging Components**: 
   - Components are arranged in a grid layout using Tailwind CSS classes.
   - Modify the `className` props to change the layout, e.g., `col-span-1`, `md:col-span-2`, etc.

### Modifying Individual Components

1. **Location**: Individual components are typically located in `app/components/analytics/`.

2. **Editing a Component**:
   - Open the component file (e.g., `UserMetricsOverview.tsx`).
   - Modify the component's logic, props, or JSX as needed.
   - Ensure to update any corresponding types or interfaces if you change the component's props.

3. **Creating a New Component**:
   - Create a new file in `app/components/analytics/`.
   - Implement your component, ensuring it accepts and uses the correct props.
   - Import and use the new component in `app/analytics/page.tsx`.

### Data Flow

1. The main analytics page fetches data using the `fetchAnalyticsData` function.
2. This data is stored in the `analyticsData` state.
3. The data is then passed down to child components as props.

### Best Practices

1. Always test changes thoroughly to ensure data is displayed correctly.
2. Keep components modular and focused on a single responsibility.
3. Use TypeScript interfaces to ensure type safety when passing props.
4. Comment your code, especially for complex logic or data transformations.
5. Follow consistent naming conventions for components, functions, and variables.
6. Optimize performance by memoizing components or using React.memo where appropriate.
7. Implement error boundaries to gracefully handle and display errors.

### Troubleshooting

If a component is not displaying or is displaying incorrect data:
1. Check that the component is correctly imported and included in the JSX.
2. Verify that the correct props are being passed to the component.
3. Use console.log statements or browser developer tools to debug data flow within the component.
4. Ensure that the API is returning the expected data structure.
5. Check for any type mismatches, especially when using TypeScript.
6. Verify that all required dependencies are installed and up-to-date.

Remember to update this documentation as the analytics system evolves, including any new components, data sources, or significant changes to the existing structure.