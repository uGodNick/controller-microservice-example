import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Get a bearer token' })
  @ApiResponse({ schema: { type: 'string' } })
  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return await this.authService.login(dto);
  }
}
