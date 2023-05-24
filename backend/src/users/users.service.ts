import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/entities';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    async create(email, username, password): Promise<User> {
        const uid = uuidv4();
        let user = this.usersRepository.create({
            uid,
            email,
            username,
            password,
            profile: new Profile({ uid, displayName: username }),
        });
        return this.usersRepository.save(user);
    }

    findOneByUid(uid: string): Promise<User | null> {
        if (!uid) {
            return null;
        }
        return this.usersRepository.findOneBy({ uid });
    }

    findOneByEmail(email: string): Promise<User | null> {
        if (!email) {
            return null;
        }
        return this.usersRepository.findOneBy({ email });
    }

    findOneByUsername(username: string): Promise<User | null> {
        if (!username) {
            return null;
        }
        return this.usersRepository.findOneBy({ username });
    }

    find(conditions: Partial<User>): Promise<User[]> {
        return this.usersRepository.find({ where: conditions });
    }

    async update(uid: string, options: Partial<User>): Promise<User> {
        const user = await this.findOneByUid(uid);
        const updatedUser = Object.assign(user, options);
        return this.usersRepository.save(updatedUser);
    }

    async delete(uid: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { uid },
            relations: { profile: true },
        });
        return this.usersRepository.remove(user);
    }

    async emailTaken(email: string): Promise<boolean> {
        const user = await this.findOneByEmail(email);
        return user !== null;
    }

    async usernameTaken(username: string): Promise<boolean> {
        const user = await this.findOneByUsername(username);
        return user !== null;
    }
}
