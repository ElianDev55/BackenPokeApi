import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
         const user =  await this.userService.getOneUser(registerDto.email);
        console.log(user);

        if (user) {
            throw new BadRequestException('User already exists');
        } else {
            const hashedPassword = await bcrypt.hash(registerDto.password, 10);
            const userToCreate = { ...registerDto, password: hashedPassword };
            return this.userService.createUser(userToCreate);
        }
    }

    async login(userlogin: RegisterDto) {

        const user = await this.userService.getOneUser(userlogin.email);

        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(userlogin.password, user.password);

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }

        const payload = { email: user.email};
   
        const token = this.jwtService.sign(payload);

        return { token, user};
    }
}

