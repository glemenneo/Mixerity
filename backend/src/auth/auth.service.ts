import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities';
import { CreateUserDto, UpdatePasswordDto } from './dtos';
import { RedisService } from 'src/common/redis';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService,
    ) {}

    async register(dto: CreateUserDto): Promise<User> {
        const { password } = dto;
        const hash = await AuthService.hashAndSalt(password);
        dto.password = hash;
        return this.usersService.create(dto);
    }

    async validateUser(username: string, password: string): Promise<User> {
        const users = await Promise.all([
            this.usersService.getOneByEmail(username),
            this.usersService.getOneByUsername(username),
        ]);

        const userExists = users.reduce(
            (boolean, user) => user !== null || boolean,
            false,
        );
        if (!userExists) {
            throw new BadRequestException('User does not exist');
        }

        for (const user of users) {
            if (user) {
                const hash = user.password;
                const isMatch = await bcrypt.compare(password.toString(), hash);

                if (isMatch) {
                    return user;
                }
            }
        }

        throw new UnauthorizedException('Incorrect password');
    }

    async login(
        user: User,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const { uid } = user;
        const accessToken = await this.generateAccessToken(uid);
        const refreshToken = await this.generateRefreshToken(uid);
        await this.updateRefreshToken(uid, refreshToken);

        return { accessToken, refreshToken };
    }

    async validateAccessToken(uid: string): Promise<User> {
        const user = await this.usersService.getOneByUid(uid);
        if (!user) {
            throw new UnauthorizedException('Invalid JWT!');
        }

        return user;
    }

    async updatePassword(
        uid: string,
        username: string,
        dto: UpdatePasswordDto,
    ): Promise<User> {
        const { old_password, new_password } = dto;
        await this.validateUser(username, old_password);
        const hash = await AuthService.hashAndSalt(new_password);
        dto.new_password = hash;
        return this.usersService.updatePassword(uid, dto);
    }

    deleteUser(uid: string): Promise<User> {
        return this.usersService.delete(uid);
    }

    async validateRefreshToken(
        uid: string,
        refreshToken,
    ): Promise<User | null> {
        const user = await this.usersService.getOneByUid(uid);
        const refreshTokenStore = await this.getRefreshToken(uid);
        if (!user || !refreshToken || refreshTokenStore !== refreshToken) {
            throw new UnauthorizedException('Invalid refresh JWT');
        }

        return user;
    }

    refreshAccessToken(uid: string): Promise<string> {
        return this.generateAccessToken(uid);
    }

    async logout(uid: string): Promise<void> {
        await this.updateRefreshToken(uid, null);
    }

    async emailTaken(email: string): Promise<boolean> {
        return this.usersService.emailTaken(email);
    }

    async usernameTaken(username: string): Promise<boolean> {
        return this.usersService.usernameTaken(username);
    }

    private static async hashAndSalt(password: string): Promise<string> {
        const saltOrRounds = 10;
        const salt = await bcrypt.genSalt(saltOrRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    private generateAccessToken(uid: string): Promise<string> {
        const payload = { sub: uid };
        const options = {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRY'),
        };

        return this.jwtService.signAsync(payload, options);
    }

    private generateRefreshToken(uid: string): Promise<string> {
        const payload = { sub: uid };
        const options = {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRY'),
        };

        return this.jwtService.signAsync(payload, options);
    }

    private getRefreshToken(uid: string): Promise<string | null> {
        return this.redisService.get(uid);
    }

    private async updateRefreshToken(
        uid: string,
        refreshToken: string | null,
    ): Promise<void> {
        if (!refreshToken) {
            await this.redisService.del(uid);
        } else {
            await this.redisService.set(uid, refreshToken);
        }
    }
}
