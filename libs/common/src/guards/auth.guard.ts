import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, tap } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = this.getAuthentication(ctx);

    return this.authService.send({ cmd: 'auth.verify-jwt' }, { jwt }).pipe(
      tap((res) => {
        console.log('canActivate pipe tap: ', res);

        this.addUser(res, ctx);
      }),
      catchError((err) => {
        throw new UnauthorizedException(err.message);
      }),
    );
  }

  private getAuthentication(ctx: ExecutionContext) {
    let authentication: string;
    if (ctx.getType() === 'rpc') {
      authentication = ctx.switchToRpc().getData().headers.authorization;
    } else if (ctx.getType() === 'http') {
      authentication = ctx.switchToHttp().getRequest().headers.authorization;
    }

    if (!authentication) {
      throw new UnauthorizedException(
        'Authentication token is missing or invalid',
      );
    }

    return authentication.replace('Bearer ', '');
  }

  private addUser(user: any, ctx: ExecutionContext) {
    if (ctx.getType() === 'rpc') {
      ctx.switchToRpc().getData().user = user;
    } else if (ctx.getType() === 'http') {
      ctx.switchToHttp().getRequest().user = user;
    }
  }
}
