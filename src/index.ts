#!/usr/bin/env node
import { Command } from 'commander';
import { createChatCompletion } from './lib/ai-sdk';

const program = new Command();

program
  .version('0.1.0')
  .description('A simple CLI to interact with various AI models via the ai-sdk.')
  .requiredOption('-m, --model <model>', 'The AI model to use (e.g., openai/gpt-4o)')
  .argument('<prompt>', 'The prompt to send to the AI model')
  .action(async (prompt, options) => {
    try {
      const response = await createChatCompletion(options.model, {
        messages: [{ role: 'user', content: prompt }],
      });
      if (response.content) {
        process.stdout.write(response.content);
      }
    } catch (error) {
      console.error(`\nError: ${error instanceof Error ? error.message : 'An unknown error occurred.'}`);
      process.exit(1);
    }
  });

program.parse(process.argv);
