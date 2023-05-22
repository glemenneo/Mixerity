import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(
        email: string,
        username: string,
        password: string,
    ): Promise<User> {
        const emailExists = await this.emailExists(email);
        if (emailExists) {
            throw new BadRequestException(
                'An account with this email already exists!',
            );
        }
        const usernameExists = await this.usernameExists(username);
        if (usernameExists) {
            throw new BadRequestException(
                'An account with this username already exists!',
            );
        }

        const hash = await AuthService.hashAndSalt(password);
        return this.usersService.create(email, username, hash);
    }

    async validateUser(username: string, password: string): Promise<User> {
        const users = await Promise.all([
            this.usersService.findOneByEmail(username),
            this.usersService.findOneByUsername(username),
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

        throw new UnauthorizedException('Incorrect credentials!');
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

    async validateAccessToken(uid: number): Promise<User> {
        const user = await this.usersService.findOneByUid(uid);
        if (!user) {
            throw new UnauthorizedException('Invalid JWT!');
        }

        return user;
    }

    async updatePassword(uid: number, password: string): Promise<User> {
        const hash = await AuthService.hashAndSalt(password);
        return this.usersService.update(uid, { uid, password: hash });
    }

    deleteUser(uid: number): Promise<User> {
        return this.usersService.delete(uid);
    }

    async validateRefreshToken(
        uid: number,
        refreshToken,
    ): Promise<User | null> {
        const user = await this.usersService.findOneByUid(uid);
        if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
            throw new UnauthorizedException('Invalid refresh JWT!');
        }

        return user;
    }

    refreshAccessToken(uid: number): Promise<String> {
        return this.generateAccessToken(uid);
    }

    logout(uid: number): Promise<User> {
        return this.updateRefreshToken(uid, null);
    }

    private async emailExists(email: string): Promise<boolean> {
        const user = await this.usersService.findOneByEmail(email);
        return user !== null;
    }

    private async usernameExists(username: string): Promise<boolean> {
        const user = await this.usersService.findOneByUsername(username);
        return user !== null;
    }

    private static async hashAndSalt(password: string): Promise<string> {
        const saltOrRounds = 10;
        const salt = await bcrypt.genSalt(saltOrRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    private async generateAccessToken(uid: number): Promise<string> {
        const payload = { sub: uid };
        const options = {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRY'),
        };

        const refreshToken = await this.jwtService.signAsync(payload, options);
        return refreshToken;
    }

    private async generateRefreshToken(uid: number): Promise<string> {
        const payload = { sub: uid };
        const options = {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRY'),
        };

        const refreshToken = await this.jwtService.signAsync(payload, options);
        return refreshToken;
    }

    private updateRefreshToken(
        uid: number,
        refreshToken: string | null,
    ): Promise<User> {
        return this.usersService.update(uid, { uid, refreshToken });
    }
}
