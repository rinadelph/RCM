# Common Troubleshooting Issues

## Google Analytics

### Issue: "Analytics verification failed"
- Check that your Measurement ID and Property ID are correct
- Ensure that your service account has the necessary permissions in Google Analytics
- Verify that the Google Analytics API is enabled in your Google Cloud project

### Issue: No data showing in reports
- Check that your tracking code is correctly installed on all pages
- Allow 24-48 hours for data to appear in your reports
- Verify that you're not using any ad-blocking software that might interfere with Analytics

## Search Console

### Issue: "Search Console verification failed"
- Ensure that your service account email is added as an owner of the property in Search Console
- Check that the "GSC Site URL" matches exactly with the property in Search Console
- Verify that the Search Console API is enabled in your Google Cloud project

### Issue: "DECODER routines::unsupported" error
- This usually indicates an issue with the API key format
- Ensure the API key is a valid private key in PEM format
- Check that the key includes the correct "BEGIN PRIVATE KEY" and "END PRIVATE KEY" delimiters
- If storing the key as JSON, parse it before use

## General Issues

### Issue: "Invalid credentials" error
- Double-check that you've entered the correct API key
- Ensure that the service account email matches the one in your Google Cloud project
- Verify that the necessary APIs are enabled in your Google Cloud project

### Issue: CORS errors when calling API routes
- Ensure that your API routes are correctly configured to handle CORS
- Check that you're calling the API from an allowed origin

For any persistent issues, please check the server logs and browser console for more detailed error messages. If problems persist, consider regenerating your service account key in the Google Cloud Console and updating it in your application settings.