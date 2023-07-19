import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, switchMap, catchError } from 'rxjs';
import { UserJwt } from '../interfaces/user-jwt.interface';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    if (ctx.getType() !== 'http') return next.handle();

    const request = ctx.switchToHttp().getRequest();

    const jwt = request.headers.authorization.replace('Bearer ', '');

    if (!jwt) return next.handle();

    return this.authService
      .send<UserJwt>({ cmd: 'auth.decode-jwt' }, { jwt })
      .pipe(
        switchMap(({ user }) => {
          // add the user object to the request
          request.user = user;
          return next.handle();
        }),
        catchError(() => next.handle()),
      );
  }
}
