import { Injectable, NestMiddleware, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService){}
  async use(req: any, res: any, next: () => void) {
    let authorization = req.headers['authorization']
    if(authorization == undefined){
      throw new BadRequestException("Please add authorization key in header");
    } else {
      try{
        await this.jwtService.verifyAsync(authorization.replace('Bearer ', ''), {secret: process.env.JWT_SECRET});
        next();
      } catch(error){
        throw new UnauthorizedException();
      }
    }
  }
}
