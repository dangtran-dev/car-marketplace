import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthSignInDto, AuthSignUpDto } from './dto';
import { Tokens, User } from './types';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signupLocal(dto: AuthSignUpDto) {
    const hashedPassword = await this.hashData(dto.password);

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const newUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  async signinLocal(dto: AuthSignInDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.getToken(user.id, user.email);
    await this.updateHashRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
      },
      data: {
        hashRefreshToken: null,
      },
    });

    return { message: 'Logout successful' };
  }

  getMe(user: User) {
    return user;
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Access Denied');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.hashRefreshToken,
    );

    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Access Denied');
    }

    const tokens = await this.getToken(user.id, user.email);
    await this.updateHashRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }

  async getToken(userId: string, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.config.get('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.config.get('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  async updateHashRefreshToken(userId: string, refreshToken: string) {
    const hashRefreshToken = await this.hashData(refreshToken);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashRefreshToken: hashRefreshToken,
      },
    });
  }
}
