# Analytics Dashboard with Google Account Selection

## Overview

We've implemented a new feature in our analytics dashboard that allows users to select and view data from different Google accounts. This includes data from both Google Search Console and Google Analytics.

## Key Components

1. **GoogleAccountSelector**: A new component that allows users to choose between different Google accounts.
2. **SearchConsoleDetail**: Updated to fetch and display data for the selected Google account.
3. **GoogleAnalyticsDetail**: Updated to fetch and display data for the selected Google account.
4. **AnalyticsPage**: The main page component, now including account selection functionality.

## New API Routes

We've added three new API routes to support this functionality:

1. **/api/google-accounts**: Fetches the list of Google accounts associated with the user.
2. **/api/search-console**: Retrieves Search Console data for a specific account.
3. **/api/google-analytics**: Retrieves Google Analytics data for a specific account.

## Implementation Details

### Account Selection
- The `GoogleAccountSelector` component displays a dropdown of available Google accounts.
- When a user selects an account, the `selectedAccount` state in the `AnalyticsPage` component is updated.
- This triggers a re-fetch of data in both `SearchConsoleDetail` and `GoogleAnalyticsDetail` components.

### Data Fetching
- Each detail component (`SearchConsoleDetail` and `GoogleAnalyticsDetail`) now accepts an `accountId` prop.
- When the `accountId` changes, these components fetch new data from their respective API routes.

### API Routes
- All API routes are protected and require user authentication.
- They use the `getServerSession` function to verify the user's session.
- The Google accounts route queries the database to find accounts associated with the user.
- The Search Console and Google Analytics routes use the Google APIs to fetch relevant data for the specified account.

## Future Improvements

1. Implement caching to reduce API calls and improve performance.
2. Add error handling and loading states in the UI components.
3. Expand the range of metrics and dimensions fetched from Google APIs.
4. Implement date range selection for more flexible reporting.

## Notes for Future Development

When creating dashboard components for specific parts of this system:

1. Ensure that new components accept and utilize the `accountId` prop for data fetching.
2. Update API routes as needed to support new data requirements.
3. Consider implementing a context or state management solution if the account selection needs to be shared across multiple pages or deeply nested components.
4. Always handle potential errors and edge cases, such as when no accounts are available or when API calls fail.

## Recent Updates and Fixes

1. **Prisma Schema Update**
   - Updated the Prisma schema to include the `GoogleService` model.
   - Run `npx prisma generate` to update the Prisma client.

2. **Search Console API Route Fix**
   - Updated the data calculation in `app/api/search-console/route.ts` to use the nullish coalescing operator (`??`) instead of logical OR (`||`).
   - This resolves the "Object is possibly 'undefined'" TypeScript error.

3. **Google Accounts API Route Fix**
   - The `googleAccount` property now exists on `PrismaClient` due to the Prisma schema update.
   - No changes were needed in the `app/api/google-accounts/route.ts` file.

4. **GoogleAccountSelector Component Fix**
   - Added a check to ensure that the `accounts` prop is an array before mapping over it.
   - Added a fallback UI for when no accounts are available.
   - This resolves the "TypeError: accounts.map is not a function" error.

5. **Google Analytics API Route Debugging**
   - Added extensive logging to the Google Analytics API route to help diagnose issues.
   - Updated error handling in the GoogleAnalyticsDetail component to display user-friendly error messages.

6. **Error Handling Improvements**
   - Enhanced error handling in API routes and components to provide more informative error messages.
   - Added checks for missing or invalid data at various stages of the data fetching process.

7. **Google Service Verification**
   - Added a new feature to verify the connection status of each Google service:
     - Each service now has a "Verify" button.
     - Clicking this button will attempt to connect to the respective Google service using the stored credentials.
     - The verification status will be displayed in a new "Status" column.
   - This feature helps users quickly identify if there are any issues with their Google service connections without having to navigate to the analytics dashboard.

8. **Google Service Verification Debugging**
   - Added extensive logging to the Google Service verification process to help diagnose issues:
     - Client-side logging in `app/settings/page.tsx`:
       - Logs the start of verification for each service.
       - Logs the API response status.
       - Logs the verification result or error details.
       - Updates the UI with specific error messages.
     - Server-side logging in `app/api/settings/google-services/verify/[id]/route.ts`:
       - Logs the service ID being verified.
       - Logs when a service is not found.
       - Logs the service details when found.
       - Adds specific logs for each service type verification.
       - Logs the verification result for Google Analytics and Search Console.
       - Provides detailed error messages in case of failures.
   - To debug verification issues:
     - Check the browser console for client-side logs.
     - Check the server logs for detailed API route logs.
     - Ensure that the service account has the necessary permissions for the Google service being verified.
     - Verify that the API keys and other credentials are correct and up-to-date.

9. **Documentation Reference**
   - This project uses a tag-based documentation system for easy reference. Use the following tags in your queries:
     - @docs/google-analytics: Information about Google Analytics integration
     - @docs/search-console: Details on Search Console API usage
     - @docs/troubleshooting: Common issues and their solutions
     - @docs/api-integration: API integration guides and best practices
   - Example usage: "How do I set up Google Analytics? @docs/google-analytics"

10. **Searching Documentation**
    - To search the documentation, use the provided Python script:

      ```
      python scripts/search_docs.py "@docs/google-analytics setup"
      ```

    - This will return a list of relevant documentation files.

11. **Logging System**
    - This project uses a custom logging system that writes logs to both the console and a file.
    - Log File Location: The logs are stored in the `logs` directory in the project root. The main log file is `app.log`.
    - Log Rotation: The logging system implements a simple log rotation mechanism:
      - When the `app.log` file exceeds 5 MB, it is renamed to `app.old.log`.
      - A new `app.log` file is created for new log entries.
      - If an `app.old.log` file already exists when rotation is needed, it is deleted before the current `app.log` is renamed.
    - Usage: To log a message, import the `log` function from the logger utility:

      ```
      import { log } from '@/utils/logger';
      ```

12. **Google Services Page Fix**
    - Fixed an issue where changing the service type didn't update the form fields correctly.
    - The `handleChange` function now properly updates the `editingService` state and clears irrelevant fields when the service type changes.
    - This ensures that the correct input fields are displayed based on the selected service type.

## Analytics Dashboard

For detailed information about the analytics dashboard, including component structure, data flow, and how to add new features, please refer to the [Analytics Dashboard Documentation](./ANALYTICS_DOCUMENTATION.md).

## Documentation Reference

This project uses a tag-based documentation system for easy reference. Use the following tags in your queries:

- @docs/google-analytics: Information about Google Analytics integration
- @docs/search-console: Details on Search Console API usage
- @docs/troubleshooting: Common issues and their solutions
- @docs/api-integration: API integration guides and best practices

Example usage: "How do I set up Google Analytics? @docs/google-analytics"

## Searching Documentation

To search the documentation, use the provided Python script:

```
python scripts/search_docs.py "@docs/google-analytics setup"
```

This will return a list of relevant documentation files.

## Logging System

This project uses a custom logging system that writes logs to both the console and a file.

### Log File Location

Logs are stored in the `logs` directory in the project root. The main log file is `app.log`.

### Log Rotation

The logging system implements a simple log rotation mechanism:

- When the `app.log` file exceeds 5 MB, it is renamed to `app.old.log`.
- A new `app.log` file is created for new log entries.
- If an `app.old.log` file already exists when rotation is needed, it is deleted before the current `app.log` is renamed.

### Usage

To log a message, import the `log` function from the logger utility:

```
import { log } from '@/utils/logger';
```

## Troubleshooting

If you're experiencing issues with the Google Services functionality, try the following steps:

1. Ensure your Prisma schema is up to date:
   - Check that the `GoogleService` model is correctly defined in `prisma/schema.prisma`.
   - Run `npx prisma generate` to update the Prisma client.
   - Run `npx prisma db push` to update your database schema.

2. Verify your database connection:
   - Check that your `.env` file contains the correct `DATABASE_URL`.
   - Try connecting to your database manually to ensure it's accessible.

3. Check the logs:
   - Look in the `logs/app.log` file for any error messages.
   - Check your server console for any error output.

4. Clear your browser cache and cookies for the site.

5. Restart your development server.

If problems persist, you may need to:
- Delete the `node_modules/.prisma` folder and run `npm install` again.
- Check for any conflicts in your `next.config.js` file.
- Ensure all necessary APIs are enabled in your Google Cloud Console.

For detailed error messages, check both the server logs and the browser console.
