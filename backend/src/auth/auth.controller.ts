import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/login')
    async login(@Body() body: LoginDto){
        console.log(process.env.JWT_SECRET)
        const user = await this.authService.login(body)
        return {
            statusCode: 200,
            message: "Login successfully",
            data: user
        }; 
    }
}
