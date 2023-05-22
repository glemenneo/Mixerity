import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [
                process.env.NODE_ENV === 'production'
                    ? '.env'
                    : `.env.${process.env.NODE_ENV}`,
            ],
        }),
    ],
})
export class AppModule {}
