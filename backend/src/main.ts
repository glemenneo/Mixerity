import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(cookieParser());
    app.use(helmet());

    const configService = app.get(ConfigService);
    const PORT = configService.get<string>('PORT') || 3000;

    await app.listen(PORT, () => {
        console.log(`NestJS server running on port ${PORT}.`);
    });
}
bootstrap();
