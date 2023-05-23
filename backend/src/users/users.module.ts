import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), ProfileModule],
    controllers: [UsersController],
    providers: [
        UsersService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true,
            }),
        },
    ],
    exports: [UsersService],
})
export class UsersModule {}
