import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    uid: number;

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

    // Soft delete column
    // @Exclude()
    // @DeleteDateColumn({ nullable: true })
    // deletedDate: Date;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
