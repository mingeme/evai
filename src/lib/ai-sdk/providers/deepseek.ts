import { BaseOpenAIProvider } from './base';
import { getEnv } from '../utils/env';

export class DeepseekProvider extends BaseOpenAIProvider {
  constructor() {
    const apiKey = getEnv('DEEPSEEK_API_KEY');
    const baseURL = getEnv('DEEPSEEK_BASE_URL', 'https://api.deepseek.com'); // Default Deepseek endpoint
    const model = getEnv('DEEPSEEK_MODEL', 'deepseek-chat'); // Sensible default for Deepseek

    if (!apiKey) {
      throw new Error('DEEPSEEK_API_KEY is not set in environment variables.');
    }

    super(apiKey, baseURL, model!);
  }
}