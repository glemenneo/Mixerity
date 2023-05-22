import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

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
        UsersModule,
    ],
})
export class AppModule {}
