import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileColumns } from '../common/constants';
import { Profile } from '../common/entities';
import { PaginationRequestDto } from '../common/pagination';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
    ) {}

    findOneByUid(uid: string): Promise<Profile | null> {
        return this.profileRepository.findOneBy({ uid });
    }

    async findOneByUidEager(uid: string): Promise<Profile | null> {
        return this.profileRepository.findOne({
            where: { uid },
            relations: { following: true },
        });
    }

    paginate(dto: PaginationRequestDto): Promise<[Profile[], number]> {
        const { limit, offset, column, order_by, search_string } = dto;
        const query = this.profileRepository.createQueryBuilder('profile');
        if (search_string) {
            query.where('displayName LIKE :search', {
                search: `%${search_string}%`,
            });
        }
        query.take(limit).skip(offset);
        if (column && order_by) {
            if (
                !Object.values(ProfileColumns).includes(
                    column as ProfileColumns,
                )
            ) {
                throw new BadRequestException('Invalid column');
            }
            query.orderBy(column, order_by);
        }
        return query.getManyAndCount();
    }

    async update(uid: string, options: Partial<Profile>): Promise<Profile> {
        const profile = await this.findOneByUid(uid);
        const updatedProfile = Object.assign(profile, options);

        return this.profileRepository.save(updatedProfile);
    }

    async delete(uid: string): Promise<Profile> {
        const profile = await this.findOneByUid(uid);
        if (!profile) {
            throw new NotFoundException();
        }

        return this.profileRepository.remove(profile);
    }

    async follow(uid: string, otherProfile: Profile): Promise<Profile> {
        const profile = await this.findOneByUidEager(uid);

        profile.following = profile.following.concat([otherProfile]);
        return this.profileRepository.save(profile);
    }

    async unFollow(uid: string, otherProfile: Profile): Promise<Profile> {
        const profile = await this.findOneByUidEager(uid);
        profile.following = profile.following.filter(
            (following) => following !== otherProfile,
        );
        return this.profileRepository.save(profile);
    }
}
