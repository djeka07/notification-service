import { UserEntity } from 'src/users/user.entity';
import { Column, Entity, JoinTable, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'notification' })
export class NotificationEntity {
  @PrimaryColumn('uuid', {
    name: 'notification_id',
  })
  notificationId: string;

  @Column({ name: 'read_at' })
  readAt: string;

  @OneToMany(() => UserEntity, (user) => user.notifications)
  @JoinTable()
  user: UserEntity;
}
