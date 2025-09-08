import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { BrokerageConfigService } from './brokerage_config.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth-guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateGlobalConfigurationDto } from './dto/brokerage_config.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('brokerage-config')
export class BrokerageConfigController {
  constructor(private readonly brokerageConfigService: BrokerageConfigService) { }

  @ApiOperation({ summary: 'Get Tpp details with Mapped LFIs and Configuration fees.' })
  @Get('tpp/:id')
  async GetGlobalData(@Req() req: any, @Param('id') id: string) {
    try {
      const result = await this.brokerageConfigService.getBrokerageData(id);
      return {
        message: 'Brokerage configuration Data Fetched successfully',
        result: result,
        statusCode: HttpStatus.OK
      }
    } catch (error) {
      throw error;
    }
  }


  @ApiOperation({ summary: 'Create TPP Lfi details' })
  @Post('tpp')
  async createConfigurationData(@Req() req: any, @Body(ValidationPipe) createGlobalConfigurationDto: CreateGlobalConfigurationDto,) {
    try {
      const result = await this.brokerageConfigService.createConfigurationData(createGlobalConfigurationDto);
      return {
        message: 'Brokerage configuration data create successfully',
        result: result,
        statusCode: HttpStatus.OK
      }
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update TPP Lfi details' })
  @Patch('/:id')
  async updateConfigurationData(@Req() req: any, @Param('id') id: string, @Body(ValidationPipe) updateGlobalConfigurationDto: CreateGlobalConfigurationDto,) {
    try {
      const result = await this.brokerageConfigService.updateConfigurationData(id, updateGlobalConfigurationDto);
      return {
        message: 'Brokerage configuration data updated successfully',
        result: result,
        statusCode: HttpStatus.OK
      }
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update TPP Lfi details' })
  @Delete('/:id')
  async deleteConfigurationData(@Req() req: any, @Param('id') id: string,) {
    try {
      const result = await this.brokerageConfigService.deleteConfigurationData(id);
      return {
        message: 'Brokerage configuration data deleted successfully',
        result: result,
        statusCode: HttpStatus.OK
      }
    } catch (error) {
      throw error;
    }
  }
}

