import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from './entities';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private dataSource: DataSource,
        private readonly profileService: ProfileService,
    ) {}

    async create(email, username, password): Promise<User> {
        let user = this.usersRepository.create({
            email,
            username,
            password,
        });

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            user = await queryRunner.manager.save(user);
            await this.profileService.create(user.uid, username);
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }

        return user;
    }

    findOneByUid(uid: number): Promise<User | null> {
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

    async update(uid: number, options: Partial<User>): Promise<User> {
        const user = await this.findOneByUid(uid);
        const updatedUser = Object.assign(user, options);
        return this.usersRepository.save(updatedUser);
    }

    async delete(uid: number): Promise<User> {
        let user = await this.findOneByUid(uid);

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            user = await this.usersRepository.remove(user);
            await this.profileService.delete(user.uid);
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }

        return user;
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
