import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
    ) {}

    create(uid: number, displayName: string): Promise<Profile> {
        const profile = this.profileRepository.create({
            uid,
            displayName,
        });
        return this.profileRepository.save(profile);
    }

    findOneByUid(uid: number): Promise<Profile | null> {
        return this.profileRepository.findOneBy({ uid });
    }

    find(conditions: Partial<Profile>): Promise<Profile[]> {
        return this.profileRepository.find({ where: conditions });
    }

    async findFriends(uid: number): Promise<Profile[]> {
        const profile = await this.findOneByUid(uid);
        const { friends: friendUidsString } = profile;

        const friendUids = JSON.parse(friendUidsString);
        const friends = await Promise.all(
            friendUids.map((uid) => this.findOneByUid(uid)),
        );
        return friends;
    }

    async update(uid: number, options: Partial<Profile>): Promise<Profile> {
        const profile = await this.findOneByUid(uid);
        if (!profile) {
            throw new NotFoundException();
        }

        const updatedProfile = Object.assign(profile, options);
        return this.profileRepository.save(updatedProfile);
    }

    async delete(uid: number): Promise<Profile> {
        const profile = await this.findOneByUid(uid);
        if (!profile) {
            throw new NotFoundException();
        }

        return this.profileRepository.remove(profile);
    }
}
