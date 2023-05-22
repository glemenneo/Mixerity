import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    create(email, username, password): Promise<User> {
        const user = this.usersRepository.create({
            email,
            username,
            password,
        });

        return this.usersRepository.save(user);
    }

    findOneByUid(uid: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ uid });
    }

    findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ email });
    }

    findOneByUsername(username: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ username });
    }

    find(conditions: Partial<User>): Promise<User[]> {
        return this.usersRepository.find({ where: conditions });
    }

    async update(uid: number, options: Partial<User>): Promise<User> {
        const user = await this.findOneByUid(uid);
        if (!user) {
            throw new NotFoundException();
        }

        const updatedUser = Object.assign(user, options);
        return this.usersRepository.save(updatedUser);
    }

    async delete(uid: number): Promise<User> {
        const user = await this.findOneByUid(uid);
        if (!user) {
            throw new NotFoundException();
        }

        return this.usersRepository.remove(user);
    }
}
