import {
    Entity,
    Column,
    ManyToMany,
    OneToOne,
    OneToMany,
    JoinTable,
    PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

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

    @OneToMany((type) => Post, (post) => post.profile)
    posts: Post[];

    @ManyToMany((type) => Post, (post) => post.likedBy)
    likedPosts: Post[];

    @ManyToMany((type) => Profile, (profile) => profile.following)
    followers: Profile[];

    @ManyToMany((type) => Profile, (profile) => profile.followers, {
        cascade: true,
    })
    @JoinTable()
    following: Profile[];
}
