import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}
    
      async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    
      async login(body: LoginDto) {
        let userData = await this.validateUser(body.email, body.password)
        if(!userData){
            throw new UnauthorizedException()
        } else {
            const payload = { email: userData.email, sub: userData.userId };
            let token = await this.jwtService.sign(payload, {secret: process.env.JWT_SECRET});
            userData['token'] = token;
            return userData;
        }
      }
}
