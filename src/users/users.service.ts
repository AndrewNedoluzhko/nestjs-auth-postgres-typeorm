import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Role} from './../roles/entities/role.entity'
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {


  
    const checkUserByEmail = await this.repo.findOne({
      where: {
        email: createUserDto.email
      }
    });

    if (checkUserByEmail) {
      throw new ConflictException('User with this email already exist.');
    } else {     
      const user = new User();
      Object.assign(user, createUserDto);
      //if roleId not specified
      //set role "User" by default
      const role = new Role();
      if (createUserDto.roleId=== undefined){     
        role.id = 1;
        role.name = 'User' ;      
      }      
      user.role= role;

      try {
        this.repo.create(user);      
        await this.repo.save(user);
        delete user.password;
        delete user.refreshToken;
        return user;
      }
      catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  }
  async findOneByEmail(email: string) {
    const user = await this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .addSelect('user.refreshToken')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.email = :email', { email: email })
      .withDeleted()
      .getOne();

    if (!user) {
      throw new HttpException(
        'User with this email not found',
        HttpStatus.NOT_FOUND
      )
    } else {
      return user;
    }
  }

  async setCurrentRefreshToken(id: number, refreshToken: string) {
    const currentUser = await this.repo
      .createQueryBuilder('user')
      .addSelect('user.refreshToken')
      .where('user.id =:id', { id: id })
      .getOne();

    if (currentUser) {
      currentUser.refreshToken = refreshToken;
      await this.repo.save(currentUser);
    } else {
      throw new BadRequestException("User not found");
    }
  }

  async removeCurrentRefreshToken(id: number) {
    return await this.repo.update(id, {
      refreshToken: null
    })
  }

  async findAll() {
    return await this.repo.find();
  }




}
