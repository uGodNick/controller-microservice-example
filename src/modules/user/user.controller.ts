import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByEmail } from './dto/get-user-by-email.dto';
import { UserService } from './user.service';

@Controller('user')
@Controller('api')
@ApiTags('user')
@ApiBearerAuth('firebase-auth')
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('email/:email')
  async getUserByEmail(@Param() dto: GetUserByEmail) {
    return await this.userService.getUserByEmail(dto.email);
  }

  @Post('register')
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }
}
