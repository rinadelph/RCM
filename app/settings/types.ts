export interface GoogleService {
  id: string;
  name: string;
  apiKey: string;
}

export interface ClarityProperty {
  id: string;
  name: string;
  value: string;
}

export interface AIService {
  id: string;
  name: string;
  type: 'openai' | 'gemini' | 'claude' | 'runway';
  apiKey: string;
}

export interface UserInfo {
  name: string;
  email: string;
  discordWebhook: string;
}

export interface EmailAccount {
  id: string;
  provider: 'gmail' | 'outlook' | 'smtp';
  email: string;
  smtpHost?: string;
  smtpPort?: string;
}

export interface ColdEmailService {
  id: string;
  name: string;
  provider: 'custom' | 'mailchimp' | 'sendgrid' | 'mailgun';
  apiKey: string;
  dailyLimit: number;
  warmupEnabled: boolean;
  warmupRate: number;
}

export interface ColdEmailSettings {
  enabled: boolean;
  dailyLimit: number;
  instantlyApiKey: string;
  instantlyWorkspaceId: string;
  campaigns: ColdEmailCampaign[];
}

export interface BlogGeneratorWebhook {
  id: string;
  name: string;
  url: string;
}

export interface BlogGeneratorSettings {
  webhooks: BlogGeneratorWebhook[];
}

export interface Settings {
  googleServices: GoogleService[];
  clarity: ClarityProperty[];
  aiServices: AIService[];
  userInfo: UserInfo;
  emailServices: EmailServices;
  coldEmailServices: ColdEmailService[];
  coldEmail: ColdEmailSettings;
  blogGenerator: BlogGeneratorSettings;
}

export interface EmailServices {
  instantly: { apiKey: string; workspaceId: string };
  accounts: EmailAccount[];
}

export interface ColdEmailServices {
  id: string;
  name: string;
  provider: 'custom' | 'mailchimp' | 'sendgrid' | 'mailgun';
  apiKey: string;
  dailyLimit: number;
  warmupEnabled: boolean;
  warmupRate: number;
}

export interface ColdEmailCampaign {
  id: string;
  name: string;
  status: 'draft' | 'scheduled' | 'running' | 'paused' | 'completed';
}