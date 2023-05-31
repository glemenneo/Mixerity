import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities';
import { Profile } from '../profile/entities';
import { PaginationRequestDto } from '../common/pagination';
import { UserColumns } from 'src/common/constants';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    async create(email, username, password): Promise<User> {
        const uid = uuidv4();
        const profile = new Profile();
        profile.uid = uid;
        profile.displayName = username;
        const user = this.usersRepository.create({
            uid,
            email,
            username,
            password,
            profile,
        });
        return this.usersRepository.save(user);
    }

    getOneByUid(uid: string): Promise<User | null> {
        if (!uid) {
            return null;
        }
        return this.usersRepository.findOneBy({ uid });
    }

    getOneByEmail(email: string): Promise<User | null> {
        if (!email) {
            return null;
        }
        return this.usersRepository.findOneBy({ email });
    }

    getOneByUsername(username: string): Promise<User | null> {
        if (!username) {
            return null;
        }
        return this.usersRepository.findOneBy({ username });
    }

    paginate(dto: PaginationRequestDto): Promise<[User[], number]> {
        const { limit, offset, column, order_by, search_string } = dto;
        const query = this.usersRepository.createQueryBuilder('user');
        if (search_string) {
            query.where('username LIKE :search', {
                search: `%${search_string}%`,
            });
        }
        query.take(limit).skip(offset);
        if (column && order_by) {
            if (!Object.values(UserColumns).includes(column as UserColumns)) {
                throw new BadRequestException('Invalid column');
            }
            query.orderBy(column, order_by);
        }
        return query.getManyAndCount();
    }

    async update(uid: string, options: Partial<User>): Promise<User> {
        const user = await this.getOneByUid(uid);
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
        const user = await this.getOneByEmail(email);
        return user !== null;
    }

    async usernameTaken(username: string): Promise<boolean> {
        const user = await this.getOneByUsername(username);
        return user !== null;
    }
}
