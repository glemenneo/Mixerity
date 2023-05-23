import {
    Entity,
    Column,
    OneToOne,
    PrimaryColumn,
    CreateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/index';

@Entity()
export class Profile {
    @PrimaryColumn()
    @OneToOne((type) => User, (user) => user.uid)
    uid: number;

    @Column()
    displayName: string;

    @Column({ nullable: true })
    profilePicUrl: string;

    @Column({ default: '' })
    bio: string;

    @Column({ default: '[]' })
    friends: string;

    @CreateDateColumn()
    created: Date;

    constructor(partial: Partial<Profile>) {
        Object.assign(this, partial);
    }
}
