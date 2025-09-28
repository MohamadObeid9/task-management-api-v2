import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentVariables } from './env.validation';

/**
 * Database Configuration Factory
 *
 * This function creates a TypeORM configuration object using validated
 * environment variables. Since Joi validation ensures all required
 * variables exist and are properly typed, we can safely access them
 * without null checks.
 */
export default registerAs('database', (): TypeOrmModuleOptions => {
  // Cast process.env to our validated type
  // This is safe because ConfigModule validates the environment on startup
  const env = process.env as unknown as EnvironmentVariables;

  return {
    type: 'postgres' as const, // Type assertion for TypeScript
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,

    // Entity auto-loading - finds all *.entity.ts files
    autoLoadEntities: true,

    // Alternative: Explicit entity paths (use one or the other)
    // entities: [__dirname + '/../**/*.entity{.ts,.js}'],

    // Synchronization - ONLY for development
    synchronize: env.NODE_ENV === 'development',
  };
});
