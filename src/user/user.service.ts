import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(dto);
    return user;

    // const createUser = await this.userRepository.findOneBy({
    //   id: user.id,
    // });
    // return createUser;
  }

  async getAllUser(): Promise<User[]> {
    const users = await this.userRepository.find({
      // relations: {
      //   ta: true,
      // },
    });
    return users;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email,
    });

    return user;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id,
    });

    return user;
  }

  async saveUser(user: User) {
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }
}
