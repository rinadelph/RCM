## Verification Errors

### DECODER routines::unsupported

If you encounter a "DECODER routines::unsupported" error during service verification:

1. Check the API key format in your database.
2. Ensure the key includes the correct "BEGIN PRIVATE KEY" and "END PRIVATE KEY" delimiters.
3. If storing the key as JSON, parse it before use.
4. Verify the `serviceName` contains the correct service account email.
5. Check that necessary APIs are enabled in your Google Cloud project.

For more details, see the troubleshooting guide: @docs/troubleshooting/verification-errors