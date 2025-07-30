import { BaseOpenAIProvider } from './base';
import { getEnv } from '../utils/env';

export class QwenProvider extends BaseOpenAIProvider {
  constructor() {
    const apiKey = getEnv('QWEN_API_KEY');
    const baseURL = getEnv('QWEN_BASE_URL', 'https://dashscope.aliyuncs.com/compatible-mode/v1'); // Default Qwen endpoint
    const model = getEnv('QWEN_MODEL', 'qwen-turbo'); // Sensible default for Qwen

    if (!apiKey) {
      throw new Error('QWEN_API_KEY is not set in environment variables.');
    }

    super(apiKey, baseURL, model!);
  }
}