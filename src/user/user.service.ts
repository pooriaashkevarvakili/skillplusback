import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { Application } from './entity/application.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,

    @InjectRepository(Application)
    private applicationRepository: Repository<Application>
  ) {} 

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create({
        email: createUserDto.email,
        username: createUserDto.username,
        password: hashedPassword,
        name: createUserDto.name,
        family: createUserDto.family
      });
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('خطا در ذخیره کاربر');
    }
  }

  find(password: string, email: string, username: string) {
    return this.userRepository.find({
      where: { password, email, username }
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    if (!result?.affected) {
      return false;
    }
    return result.affected > 0;
  }

  async search(filters: {
    username?: string;
    email?: string;
    name?: string;
    family?: string;
  }): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('user');
    if (filters.username) {
      query.andWhere('user.username LIKE :username', { username: `%${filters.username}%` });
    }
    if (filters.email) {
      query.andWhere('user.email LIKE :email', { email: `%${filters.email}%` });
    }
    if (filters.name) {
      query.andWhere('user.name LIKE :name', { name: `%${filters.name}%` });
    }
    if (filters.family) {
      query.andWhere('user.family LIKE :family', { family: `%${filters.family}%` });
    }
    return query.getMany();
  }

  async findAllapplication(): Promise<Application[]> {
    return await this.applicationRepository.find();
}

 
}