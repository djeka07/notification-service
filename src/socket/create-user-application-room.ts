import { SessionEntity } from '../sessions/session.entity';
export default (session: SessionEntity) =>
  `${session?.applicationId}-${session?.user?.userId}`;
