export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface ChatResponse {
  content: string | null;
}

export interface GatewayChatRequest extends Omit<ChatRequest, 'model'> {}

export interface AIProvider {
  chat(request: ChatRequest): Promise<ChatResponse>;
}