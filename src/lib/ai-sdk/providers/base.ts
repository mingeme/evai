import OpenAI from 'openai';
import type { AIProvider, ChatRequest, ChatResponse } from '../types';

export abstract class BaseOpenAIProvider implements AIProvider {
  protected readonly openai: OpenAI;
  protected readonly model: string;

  constructor(apiKey: string, baseURL: string | null | undefined, model: string) {
    this.openai = new OpenAI({ apiKey, baseURL });
    this.model = model;
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const modelName = request.model || this.model;
    if (request.stream) {
      const stream = await this.openai.chat.completions.create({
        model: modelName,
        messages: request.messages,
        temperature: request.temperature,
        max_tokens: request.max_tokens,
        stream: true,
      });
      let content = '';
      for await (const chunk of stream) {
        content += chunk.choices[0]?.delta?.content || '';
      }
      return { content };
    } else {
      const completion = await this.openai.chat.completions.create({
        model: modelName,
        messages: request.messages,
        temperature: request.temperature,
        max_tokens: request.max_tokens,
        stream: false,
      });
      return {
        content: completion.choices[0].message.content,
      };
    }
  }
}