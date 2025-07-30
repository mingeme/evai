export function getEnv(name: string, defaultValue?: string): string | undefined {
  return process.env[name] ?? defaultValue;
}