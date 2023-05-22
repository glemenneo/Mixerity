import { Entity, Column, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

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

    constructor(partial: Partial<Profile>) {
        Object.assign(this, partial);
    }
}
