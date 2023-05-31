import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../common/entities';
import { PaginationRequestDto } from '../common/pagination';
import { UserColumns } from '../common/constants';
import { CreateUserDto } from '../auth/dtos';
import { UpdateUserDto } from './dtos';
import { UpdatePasswordDto } from '../auth/dtos';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    async create(dto: CreateUserDto): Promise<User> {
        const uid = uuidv4();
        const user = dto.toEntity(uid);
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

    async update(uid: string, dto: UpdateUserDto): Promise<User> {
        const user = dto.toEntity(uid);
        return this.usersRepository.save(user);
    }

    async updatePassword(uid: string, dto: UpdatePasswordDto): Promise<User> {
        const user = dto.toEntity(uid);
        return this.usersRepository.save(user);
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
