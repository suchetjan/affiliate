import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export default async (req: any, res: any) => {
  if (!server.locals.app) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
      { logger: false }
    );
    
    app.enableCors();
    await app.init();
    server.locals.app = app;
  }
  
  return server(req, res);
};