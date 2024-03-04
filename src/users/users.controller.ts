import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { updateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('users')


export class UsersController {


    constructor(private usersService: UsersService) {}


    @Get()
    getAllUsers() : Promise<User[]> {
        return this.usersService.getAllUsers();
    }

   

    @Post()
    createuser(@Body() newUser: CreateUserDto): Promise<User> {
        return this.usersService.createUser(newUser);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getUserById(@Param('id', ParseIntPipe)  id: number): Promise<User> {
        return this.usersService.getUserById(id);
    }

    @Get('email/:email')
    getOneUser(@Param('email') email: string): Promise<User> {
        return this.usersService.getOneUser(email);
    }


    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: Partial<updateUserDto>) {
        return this.usersService.updateUser(id, user);
    }
 
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
    



}
