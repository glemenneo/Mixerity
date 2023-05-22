import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());

    const configService = app.get(ConfigService);
    const PORT = configService.get<string>('PORT') || 3000;

    await app.listen(PORT, () => {
        console.log(`NestJS server running on port ${PORT}.`);
    });
}
bootstrap();
