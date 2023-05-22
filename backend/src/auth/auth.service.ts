import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

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

        const hash = AuthService.hashAndSalt(password);
        return this.usersService.create(email, username, hash);
    }

    async validateUser(
        emailOrUsername: string,
        password: string,
    ): Promise<User> {
        const users = await Promise.all([
            this.usersService.findOneByEmail(emailOrUsername),
            this.usersService.findOneByUsername(emailOrUsername),
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

    async updatePassword(uid: number, password: string): Promise<User> {
        const hash = await AuthService.hashAndSalt(password);
        return this.usersService.update(uid, { uid, password: hash });
    }

    deleteUser(uid: number): Promise<User> {
        return this.usersService.delete(uid);
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
}
