import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'User is not authorized ',
        });
      }

      const userParams = this.jwtService.verify(token);

      const user = await this.userService.getUserById(userParams.id);
      if (!user || user.token !== token) {
        throw new UnauthorizedException({
          message: 'User is not authorized ',
        });
      }
      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'User is not authorized ',
      });
    }
  }
}
