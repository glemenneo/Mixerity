import {
    Entity,
    Column,
    OneToOne,
    PrimaryColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
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

    @ManyToMany((type) => Profile)
    @JoinTable()
    following: Profile[];

    @CreateDateColumn()
    created: Date;

    constructor(partial: Partial<Profile>) {
        Object.assign(this, partial);
    }
}
