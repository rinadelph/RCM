# Setting Up Google Analytics

## Prerequisites

- A Google account
- Access to your website's code

## Steps

1. Create a Google Analytics account:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Click "Start measuring"
   - Follow the setup wizard

2. Get your Measurement ID:
   - In your Google Analytics property, go to Admin > Data Streams
   - Select your web stream
   - Copy the Measurement ID (starts with "G-")

3. Add the Google Analytics tag to your website:
   - In your project, navigate to `app/settings/page.tsx`
   - Add a new Google Service with type "analytics"
   - Enter your Measurement ID in the "GA Measurement ID" field
   - Enter your Google Analytics Property ID in the "GA Property ID" field

4. Verify the installation:
   - Use the "Verify" button in the Google Services Settings page
   - Check your website's real-time reports in Google Analytics

## Obtaining the API Secret

To get your API secret:

1. Go to your Google Analytics 4 property
2. Click on 'Admin' in the bottom left
3. In the property column, click on 'Data Streams'
4. Select your web data stream
5. Under 'Measurement Protocol API secrets', click 'Create'
6. Copy the generated secret and use it in the settings form

Remember to keep your API secret secure and never expose it in client-side code.

## Troubleshooting

- If verification fails, check that your Measurement ID and Property ID are correct
- Ensure that your service account has the necessary permissions
- For more issues, see @docs/troubleshooting/google-analytics
