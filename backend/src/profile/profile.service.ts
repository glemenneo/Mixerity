import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities';

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

    findOneByUidEager(uid: number): Promise<Profile | null> {
        return this.profileRepository.findOne({
            where: { uid },
            relations: { following: true },
        });
    }

    find(conditions: Partial<Profile>): Promise<Profile[]> {
        return this.profileRepository.find({ where: conditions });
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

    async follow(uid: number, otherProfile: Profile): Promise<Profile> {
        const profile = await this.findOneByUidEager(uid);
        profile.following = profile.following.concat([otherProfile]);
        return this.profileRepository.save(profile);
    }

    async unFollow(uid: number, otherProfile: Profile): Promise<Profile> {
        const profile = await this.findOneByUidEager(uid);
        profile.following = profile.following.filter(
            (following) => following !== profile,
        );
        return this.profileRepository.save(profile);
    }
}
