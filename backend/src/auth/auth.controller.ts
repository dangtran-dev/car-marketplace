import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { getUser } from 'src/common/decorator';
import { JwtAccessAuthGuard, JwtRefreshAuthGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { AuthSignUpDto, AuthSignInDto } from './dto';
import type { Tokens, User } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signup')
  signupLocal(@Body() dto: AuthSignUpDto) {
    return this.authService.signupLocal(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/local/signin')
  signinLocal(@Body() dto: AuthSignInDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @UseGuards(JwtAccessAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  logout(@getUser('id') userId: string) {
    return this.authService.logout(userId);
  }

  @UseGuards(JwtAccessAuthGuard)
  @Get('/me')
  getMe(@getUser() user: User) {
    return this.authService.getMe(user);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  refreshTokens(
    @getUser('id') userId: string,
    @getUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
