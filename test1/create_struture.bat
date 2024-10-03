@echo off
REM Create the main directory
mkdir ai-web-solutions-crm

REM Create subdirectories if they don't exist
mkdir ai-web-solutions-crm\components\layout
mkdir ai-web-solutions-crm\components\ui
mkdir ai-web-solutions-crm\components\widgets
mkdir ai-web-solutions-crm\pages
mkdir ai-web-solutions-crm\lib
mkdir ai-web-solutions-crm\styles

REM Create files in components\layout only if they don't exist
if not exist ai-web-solutions-crm\components\layout\Layout.tsx (type nul > ai-web-solutions-crm\components\layout\Layout.tsx)

REM Create files in components\ui only if they don't exist
if not exist ai-web-solutions-crm\components\ui\avatar.tsx (type nul > ai-web-solutions-crm\components\ui\avatar.tsx)
if not exist ai-web-solutions-crm\components\ui\button.tsx (type nul > ai-web-solutions-crm\components\ui\button.tsx)
if not exist ai-web-solutions-crm\components\ui\card.tsx (type nul > ai-web-solutions-crm\components\ui\card.tsx)
if not exist ai-web-solutions-crm\components\ui\checkbox.tsx (type nul > ai-web-solutions-crm\components\ui\checkbox.tsx)
if not exist ai-web-solutions-crm\components\ui\data-table.tsx (type nul > ai-web-solutions-crm\components\ui\data-table.tsx)
if not exist ai-web-solutions-crm\components\ui\dialog.tsx (type nul > ai-web-solutions-crm\components\ui\dialog.tsx)
if not exist ai-web-solutions-crm\components\ui\dropdown-menu.tsx (type nul > ai-web-solutions-crm\components\ui\dropdown-menu.tsx)
if not exist ai-web-solutions-crm\components\ui\input.tsx (type nul > ai-web-solutions-crm\components\ui\input.tsx)
if not exist ai-web-solutions-crm\components\ui\label.tsx (type nul > ai-web-solutions-crm\components\ui\label.tsx)
if not exist ai-web-solutions-crm\components\ui\select.tsx (type nul > ai-web-solutions-crm\components\ui\select.tsx)
if not exist ai-web-solutions-crm\components\ui\switch.tsx (type nul > ai-web-solutions-crm\components\ui\switch.tsx)
if not exist ai-web-solutions-crm\components\ui\tabs.tsx (type nul > ai-web-solutions-crm\components\ui\tabs.tsx)

REM Create files in components\widgets only if they don't exist
if not exist ai-web-solutions-crm\components\widgets\CampaignsWidget.tsx (type nul > ai-web-solutions-crm\components\widgets\CampaignsWidget.tsx)
if not exist ai-web-solutions-crm\components\widgets\UniboxWidget.tsx (type nul > ai-web-solutions-crm\components\widgets\UniboxWidget.tsx)
if not exist ai-web-solutions-crm\components\widgets\CRMWidget.tsx (type nul > ai-web-solutions-crm\components\widgets\CRMWidget.tsx)
if not exist ai-web-solutions-crm\components\widgets\OpportunitiesWidget.tsx (type nul > ai-web-solutions-crm\components\widgets\OpportunitiesWidget.tsx)
if not exist ai-web-solutions-crm\components\widgets\AnalyticsWidget.tsx (type nul > ai-web-solutions-crm\components\widgets\AnalyticsWidget.tsx)
if not exist ai-web-solutions-crm\components\widgets\CustomerListWidget.tsx (type nul > ai-web-solutions-crm\components\widgets\CustomerListWidget.tsx)
if not exist ai-web-solutions-crm\components\widgets\EmailDashboardWidget.tsx (type nul > ai-web-solutions-crm\components\widgets\EmailDashboardWidget.tsx)
if not exist ai-web-solutions-crm\components\widgets\TaskListWidget.tsx (type nul > ai-web-solutions-crm\components\widgets\TaskListWidget.tsx)
if not exist ai-web-solutions-crm\components\widgets\WebsiteAnalyticsWidget.tsx (type nul > ai-web-solutions-crm\components\widgets\WebsiteAnalyticsWidget.tsx)
if not exist ai-web-solutions-crm\components\widgets\ColdEmailAnalyticsWidget.tsx (type nul > ai-web-solutions-crm\components\widgets\ColdEmailAnalyticsWidget.tsx)

REM Create files in pages only if they don't exist
if not exist ai-web-solutions-crm\pages\_app.tsx (type nul > ai-web-solutions-crm\pages\_app.tsx)
if not exist ai-web-solutions-crm\pages\index.tsx (type nul > ai-web-solutions-crm\pages\index.tsx)
if not exist ai-web-solutions-crm\pages\settings.tsx (type nul > ai-web-solutions-crm\pages\settings.tsx)
if not exist ai-web-solutions-crm\pages\cold-email-campaigns.tsx (type nul > ai-web-solutions-crm\pages\cold-email-campaigns.tsx)

REM Create files in lib only if they don't exist
if not exist ai-web-solutions-crm\lib\data.ts (type nul > ai-web-solutions-crm\lib\data.ts)
if not exist ai-web-solutions-crm\lib\utils.ts (type nul > ai-web-solutions-crm\lib\utils.ts)

REM Create files in styles only if they don't exist
if not exist ai-web-solutions-crm\styles\globals.css (type nul > ai-web-solutions-crm\styles\globals.css)

REM Create additional config files only if they don't exist
if not exist ai-web-solutions-crm\next.config.js (type nul > ai-web-solutions-crm\next.config.js)
if not exist ai-web-solutions-crm\package.json (type nul > ai-web-solutions-crm\package.json)
if not exist ai-web-solutions-crm\tsconfig.json (type nul > ai-web-solutions-crm\tsconfig.json)
if not exist ai-web-solutions-crm\tailwind.config.js (type nul > ai-web-solutions-crm\tailwind.config.js)

echo "Directory structure and files created/verified successfully."
