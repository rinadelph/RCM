import { google } from 'googleapis';

export async function initializeGoogleApis(serviceAccountKey: string) {
    const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(serviceAccountKey),
        scopes: [
            'https://www.googleapis.com/auth/analytics.readonly',
            'https://www.googleapis.com/auth/webmasters.readonly',
        ],
    });

    const analyticsReporting = google.analyticsreporting({ version: 'v4', auth });
    const searchConsole = google.searchconsole({ version: 'v1', auth });

    return { analyticsReporting, searchConsole };
}

export async function getAnalyticsData(analyticsReporting: any, viewId: string) {
    const res = await analyticsReporting.reports.batchGet({
        requestBody: {
            reportRequests: [
                {
                    viewId: viewId,
                    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
                    metrics: [{ expression: 'ga:sessions' }, { expression: 'ga:pageviews' }],
                    dimensions: [{ name: 'ga:date' }],
                },
            ],
        },
    });

    return res.data.reports[0].data.rows;
}

export async function getSearchConsoleData(searchConsole: any, siteUrl: string) {
    const res = await searchConsole.searchanalytics.query({
        siteUrl: siteUrl,
        requestBody: {
            startDate: '7daysAgo',
            endDate: 'today',
            dimensions: ['query'],
            rowLimit: 10,
        },
    });

    return res.data.rows;
}