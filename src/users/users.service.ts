import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    const checkUser= await this.repo.findOne({
      where: {
        email: createUserDto.email
      }
    });

    if (checkUser){
      throw new ConflictException('User with that email already exist');      
    } else {
      const user= new User();
      Object.assign(user, createUserDto);
      try {
        this.repo.create(user);
        await this.repo.save(user);
        delete user.password;
        return user;
      }
      catch (error){
        throw new BadRequestException(error.message);
      }

    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
