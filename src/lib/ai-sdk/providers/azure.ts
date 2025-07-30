import { BaseOpenAIProvider } from './base';
import { getEnv } from '../utils/env';

export class AzureProvider extends BaseOpenAIProvider {
  constructor() {
    const apiKey = getEnv('AZURE_API_KEY');
    const baseURL = getEnv('AZURE_BASE_URL');
    const model = getEnv('AZURE_MODEL', 'gpt-4'); // Sensible default for Azure

    if (!apiKey) {
      throw new Error('AZURE_API_KEY is not set in environment variables.');
    }
    if (!baseURL) {
      throw new Error('AZURE_BASE_URL is not set in environment variables.');
    }

    super(apiKey, baseURL, model!);
  }
}