import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()

export class UsersService {


    constructor(@InjectRepository(User) private userRespository: Repository <User> ) {}


    createUser(User : CreateUserDto) {
        
        const newUser =  this.userRespository.create(User);
        return this.userRespository.save(newUser);
    }

    

    getAllUsers() {
        return this.userRespository.find();
    }

    getUserById(id: number) {
        return this.userRespository.findOne({
            where: { id }
        });
    
}

    getOneUser(email: string) {
        return this.userRespository.findOne({
            where: { email }
        });
    
    }

    deleteUser(id: number) {
        return this.userRespository.delete({id});
    }

    updateUser(id: number, user: Partial<updateUserDto>) {
        return this.userRespository.update({id}, user);
    }


    
   

}