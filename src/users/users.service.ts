import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    console.log(`UsersService.create before checkUserByEmail`);
    const checkUserByEmail= await this.repo.findOne({
      where: {
        email: createUserDto.email
      }
    });
    console.log(`UsersService.create after checkUserByEmail`);
    if (checkUserByEmail){
      console.log(`UsersService.create  checkUserByEmail =true`);
      throw new ConflictException('User with this email already exist');      
    } else {
      console.log(`UsersService.create before checkUserByEmail = false`);
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
  async findOneByEmail(email: string) {
    const user= await this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .addSelect('user.refreshToken')
      .where('user.email = :email', {email: email})
      .withDeleted()
      .getOne();
    
    if (!user){ 
      throw new HttpException(
        'User with this email not found',
        HttpStatus.NOT_FOUND
      )
    } else {
     return user; 
    }    
  }
  

  async setCurrentRefreshToken(id:number, refreshToken: string){
    const currentUser = await this.repo
      .createQueryBuilder('user')
      .addSelect('user.refreshToken')
      .where('user.id =:id', {id: id})
      .getOne();

    if (currentUser){
      currentUser.refreshToken=refreshToken;
      await this.repo.save(currentUser);
    } else {
      throw new BadRequestException("User not found");
    }

  }

  async removeCurrentRefreshToken(id: number){
    return this.repo.update(id, {
      refreshToken: null
    })   
  }




}
