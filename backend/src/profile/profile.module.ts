import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([Profile])],
    controllers: [ProfileController],
    providers: [
        ProfileService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                transform: true,
                whitelist: true,
            }),
        },
    ],
    exports: [ProfileService],
})
export class ProfileModule {}
