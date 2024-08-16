import { UserEntity } from '../users/user.entity';
import { JoinTable, ManyToOne } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'session' })
export class SessionEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'session_id',
  })
  sessionId: string;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  @JoinTable()
  user: UserEntity;

  @Column({ name: 'application_id' })
  applicationId: string;

  @Column({ default: false })
  online: boolean;

  @Column({ nullable: true, type: 'timestamp' })
  lastActive: Date;
}
