import {
    Entity,
    Column,
    ManyToMany,
    OneToOne,
    JoinTable,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    pid: number;

    @ManyToOne((type) => Profile, (profile) => profile.posts)
    profile: Profile;

    @ManyToMany((type) => Profile, (profile) => profile.likedPosts)
    @JoinTable()
    likedBy: Profile[];

    @Column()
    picUrl: string;

    @Column()
    caption: string;

    @Column({
        type: 'datetime',
        default: () => 'current_timestamp()',
    })
    createdAt: Date;

    @Column({
        type: 'datetime',
        default: () => 'current_timestamp()',
        onUpdate: 'current_timestamp()',
    })
    updatedAt: Date;

    @Column()
    isDeleted: boolean;
}
