import {
    Entity,
    PrimaryColumn,
    Column,
    OneToOne,
    JoinColumn,
    DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Profile } from 'src/profile/entities';

@Entity()
export class User {
    @PrimaryColumn('uuid')
    uid: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Exclude()
    @Column()
    password: string;

    @Exclude()
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    created: string;

    @Exclude()
    @Column({ nullable: true })
    refreshToken: string;

    @OneToOne((type) => Profile, (profile) => profile.user, {
        cascade: true,
    })
    @JoinColumn()
    profile: Profile;

    // Soft delete column
    // @Exclude()
    // @DeleteDateColumn({ nullable: true })
    // deletedDate: Date;
}
