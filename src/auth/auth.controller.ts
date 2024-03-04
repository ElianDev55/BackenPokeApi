import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Body } from '@nestjs/common';

@Controller('auth')


export class AuthController {

    constructor(
        private readonly authService: AuthService,
        
    ) { }

    @Post('register')
    register(
        @Body() resgiterDto: RegisterDto
    ) {
        return this.authService.register(resgiterDto);
    }

    @Post('login')
    login(
        @Body() userlogin: RegisterDto
    ) {
        return this.authService.login(userlogin);
    }
}
