import { NotificationEntity } from 'src/notifications/notification.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { SessionEntity } from '../sessions/session.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn('uuid', {
    name: 'user_id',
  })
  userId: string;

  @Column({
    name: 'username',
    nullable: false,
    unique: true,
    default: '',
  })
  username: string;

  @Column({ name: 'first_name', nullable: true, default: '' })
  firstName: string;

  @Column({ name: 'last_name', nullable: true, default: '' })
  lastName: string;

  @Column({
    name: 'email',
    unique: true,
    nullable: false,
    default: '',
  })
  email: string;

  @Column({ default: false })
  online: boolean;

  @Column({ nullable: true })
  lastActive: string;

  @OneToMany(() => NotificationEntity, (notification) => notification.user)
  notifications: NotificationEntity[];

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];
}
