import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserResponse } from './generated/user-client';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll({ page, take }: { page: number; take: number }): Promise<{
    total: number;
    users: UserEntity[];
    page: number;
    take: number;
  }> {
    const skip = (page - 1) * take;
    const [users, total] = await this.userRepository.findAndCount({
      skip,
      take,
    });

    return { total, users, page, take };
  }

  async findOneById(id: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ userId: id });
  }

  async findAllUserConversations(id: string): Promise<string[]> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.user_id=:id', { id })
      .loadAllRelationIds()
      .getOne();

    return user?.notifications.map((c) => c as unknown as string);
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  async addOrUpdateUsers(
    users: UserResponse[],
  ): Promise<{ updated: number; added: number; users: UserEntity[] }> {
    let updated = 0;
    let added = 0;
    const createdUsers = await Promise.all(
      users.map(async (user) => {
        const usr = (await this.findOneById(user?.id)) || new UserEntity();
        if (!!usr.email) {
          updated += 1;
        } else {
          added += 1;
        }
        usr.email = user.email;
        usr.userId = user.id;
        usr.firstName = user.firstName;
        usr.lastName = user.lastName;
        usr.username = user.username;
        return this.save(usr);
      }),
    );

    return { updated, added, users: createdUsers };
  }

  async deleteOldUsers(users: UserResponse[]): Promise<DeleteResult[]> {
    const usrs = [];
    let page = 1;
    const take = 10;
    let hasNextPage = true;

    while (hasNextPage) {
      const { total, users: allUsers } = await this.findAll({ page, take });
      hasNextPage = page * take < total;
      page += 1;
      usrs.push(...allUsers);
    }

    const deletedUsers = await Promise.all(
      usrs
        .filter((u) => !users.map((s) => s.id).includes(u.userId))
        .map(async (user) => {
          return this.delete(user.userId);
        }),
    );

    return deletedUsers;
  }
}
