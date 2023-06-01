import {
    Entity,
    Column,
    ManyToMany,
    OneToOne,
    JoinTable,
    PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
    @PrimaryColumn()
    uid: string;

    @OneToOne((type) => User, (user) => user.profile)
    user: User;

    @Column()
    displayName: string;

    @Column({ nullable: true })
    profilePicUrl: string;

    @Column({ default: '' })
    bio: string;

    @ManyToMany((type) => Profile, (profile) => profile.following)
    followers: Profile[];

    @ManyToMany((type) => Profile, (profile) => profile.followers, {
        cascade: true,
    })
    @JoinTable()
    following: Profile[];
}
