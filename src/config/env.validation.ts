import * as Joi from 'joi';

/**
 * Environment Variable Validation Schema
 *
 * This schema defines all required environment variables with their types,
 * constraints, and default values. It ensures the application fails fast
 * at startup if critical configuration is missing or invalid.
 */
export const envValidationSchema = Joi.object({
  // Application Configuration
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development')
    .description('Application environment'),

  PORT: Joi.number().port().default(3000).description('Server port number'),

  // Database Configuration
  DB_HOST: Joi.string()
    .hostname()
    .required()
    .description('Database host address'),

  DB_PORT: Joi.number()
    .port()
    .default(5432)
    .description('Database port number'),

  DB_USERNAME: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .description('Database username'),

  DB_PASSWORD: Joi.string()
    .min(8)
    .required()
    .description('Database password (minimum 8 characters)'),

  DB_NAME: Joi.string()
    .alphanum()
    .min(3)
    .max(50)
    .required()
    .description('Database name'),

  // JWT Configuration
  JWT_SECRET: Joi.string()
    .min(32)
    .required()
    .description('JWT secret key (minimum 32 characters for security)'),

  JWT_EXPIRES_IN: Joi.string()
    .pattern(/^(\d+[smhd])|(\d+)$/)
    .default('1d')
    .description('JWT expiration time (e.g., 1d, 12h, 60m)'),

  // Redis Configuration (optional for now)
  REDIS_HOST: Joi.string()
    .hostname()
    .default('localhost')
    .description('Redis host address'),

  REDIS_PORT: Joi.number()
    .port()
    .default(6379)
    .description('Redis port number'),

  // Email Configuration (optional for now)
  SMTP_HOST: Joi.string().hostname().optional().description('SMTP server host'),

  SMTP_PORT: Joi.number().port().optional().description('SMTP server port'),

  SMTP_USER: Joi.string()
    .email()
    .optional()
    .description('SMTP username (email)'),

  SMTP_PASS: Joi.string()
    .optional()
    .description('SMTP password or app password'),
});
