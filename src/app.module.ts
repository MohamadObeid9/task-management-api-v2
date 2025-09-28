import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envValidationSchema } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [databaseConfig],
      cache: true,
      // Filter environment variables - only validate app-specific ones
      ignoreEnvVars: true, // Ignore process.env completely
      // Joi validation schema - validates all env vars at startup
      validationSchema: envValidationSchema,
      // Validation options
      validationOptions: {
        allowUnknown: false, // Reject unknown environment variables
        abortEarly: true, // Stop on first validation error for faster feedback
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // With Joi validation, this will NEVER be undefined
        // If it were undefined, the app would have failed to start
        const config = configService.get<TypeOrmModuleOptions>('database');
        return config!;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
