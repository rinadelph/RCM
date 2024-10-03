# Google Analytics 4 (GA4) Integration

## Overview

This project uses the Google Analytics Data API v1beta to interact with GA4 properties. We use a service account for authentication to simplify the process and avoid user-based authentication flows.

## Setup

1. Create a Google Cloud Project and enable the Google Analytics Data API.
2. Create a service account and download the JSON key file.
3. In your GA4 property, add the service account email as a user with appropriate permissions.

## Authentication

We use the Google Auth Library to create a JWT client with the service account credentials: