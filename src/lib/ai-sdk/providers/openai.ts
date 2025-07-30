import { BaseOpenAIProvider } from './base';
import { getEnv } from '../utils/env';

export class OpenAIProvider extends BaseOpenAIProvider {
  constructor() {
    const apiKey = getEnv('OPENAI_API_KEY');
    const baseURL = getEnv('OPENAI_BASE_URL'); // Defaults to OpenAI's endpoint if null
    const model = getEnv('OPENAI_MODEL', 'gpt-4o');

    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables.');
    }

    super(apiKey, baseURL, model!);
  }
}