import { AIProvider, ChatResponse, GatewayChatRequest } from './types';
import { OpenAIProvider } from './providers/openai';
import { AzureProvider } from './providers/azure';
import { DeepseekProvider } from './providers/deepseek';
import { QwenProvider } from './providers/qwen';

type ProviderClass = new () => AIProvider;

const providerMap: Record<string, ProviderClass> = {
  openai: OpenAIProvider,
  azure: AzureProvider,
  deepseek: DeepseekProvider,
  qwen: QwenProvider,
};

export async function createChatCompletion(
  model: string,
  request: GatewayChatRequest
): Promise<ChatResponse> {
  const [providerName, modelName] = model.split('/');
  if (!providerName || !modelName) {
    throw new Error(
      `Invalid model format. Expected format: 'provider/model', but got '${model}'.`
    );
  }

  const Provider = providerMap[providerName];
  if (!Provider) {
    throw new Error(`Provider '${providerName}' is not supported.`);
  }

  const providerInstance = new Provider();
  
  return providerInstance.chat({
    ...request,
    model: modelName,
  });
}