# Issue Resolutions and Lessons Learned

This document logs issues we've encountered and their resolutions, serving as a knowledge base for future reference.

## Google API Integration

### Issue: "DECODER routines::unsupported" error

**Problem:** Encountered when verifying Google service credentials.

**Resolution:**
1. Ensure the API key is in the correct format (PEM for private keys).
2. Check for proper "BEGIN PRIVATE KEY" and "END PRIVATE KEY" delimiters.
3. If storing as JSON, parse before use.

**Lesson Learned:** Always validate the format of API keys and credentials before storing and using them.

## NextAuth Configuration

### Issue: NEXTAUTH_URL and NEXTAUTH_SECRET warnings

**Problem:** NextAuth was throwing warnings about missing environment variables.

**Resolution:**
1. Set `NEXTAUTH_URL` to the application's base URL.
2. Generate a strong, unique `NEXTAUTH_SECRET` for production use.
3. Add these to the `.env.local` file for development and server environment for production.

**Lesson Learned:** Always set up required environment variables for authentication libraries early in the development process.

## Prisma Client Generation

### Issue: Prisma Client not updating after schema changes

**Problem:** New models or fields not recognized by the Prisma Client.

**Resolution:**
1. Run `npx prisma generate` after every schema change.
2. If issues persist, delete `node_modules/.prisma` and regenerate.

**Lesson Learned:** Integrate Prisma schema updates into the development workflow, possibly as a pre-commit hook.

(Continue to add more issues and resolutions as they occur)