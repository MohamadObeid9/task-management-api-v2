/**
 * Environment variable types inferred from Joi schema
 * This provides TypeScript type safety for environment variables
 */
export type EnvironmentVariables = {
  NODE_ENV: 'development' | 'production' | 'test' | 'staging';
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  SMTP_HOST?: string;
  SMTP_PORT?: number;
  SMTP_USER?: string;
  SMTP_PASS?: string;
};
