import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth-guard';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getProfile(@Req() req: any) {
    try {
      const users = await this.profileService.getProfile();
      return {
        message: 'List of users',
        result: users,
        statusCode: HttpStatus.OK
      }
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('log')
  async getLogData(@Req() req: any) {
    try {
      const logData = await this.profileService.getLogData();
      return {
        message: 'List of Logs',
        result: logData,
        statusCode: HttpStatus.OK
      }
    } catch (error) {
      throw error;
    }
  }

}
