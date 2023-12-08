import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

interface JwtUserData {
  username: string;
  userId: string;
}

declare module 'express' {
  interface Request {
    user: JwtUserData;
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const includesUrl = ['/api/user/login', '/api/user/register'];
    if (includesUrl.includes(request.url)) {
      return true;
    }
    const access_token = request.headers.access_token;
    if (!access_token) {
      throw new HttpException('用户未登录', HttpStatus.UNAUTHORIZED);
    }

    try {
      const token = access_token.split(' ')[1];

      request.user = this.jwtService.verify<JwtUserData>(token);
      return true;
    } catch (e) {
      throw new HttpException(
        'token已过期，请重新登录',
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
