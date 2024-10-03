# Using the Search Console API

## Prerequisites
- A Google account with Search Console access
- API access enabled in Google Cloud Console

## Steps

1. Set up Search Console:
   - Add and verify your website in [Search Console](https://search.google.com/search-console)

2. Enable the Search Console API:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project
   - Navigate to APIs & Services > Library
   - Search for "Search Console API" and enable it

3. Create credentials:
   - In the Google Cloud Console, go to APIs & Services > Credentials
   - Create a new Service Account
   - Download the JSON key file

4. Add the Search Console service to your project:
   - In your project, navigate to `app/settings/page.tsx`
   - Add a new Google Service with type "searchConsole"
   - Enter your website URL in the "GSC Site URL" field
   - Paste the contents of your JSON key file into the "API Key" field

5. Use the API:
   - The `app/api/search-console/route.ts` file contains an example of how to use the Search Console API

## Troubleshooting
- If you encounter permission errors, ensure your service account has the necessary permissions in Search Console
- For more issues, see @docs/troubleshooting/search-console