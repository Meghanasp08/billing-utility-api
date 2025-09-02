import { Module } from '@nestjs/common';
import { BrokerageConfigService } from './brokerage_config.service';
import { BrokerageConfigController } from './brokerage_config.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LfiData, LfiDataSchema } from 'src/upload/schemas/lfi-data.schema';
import { TppData, TppDataSchema } from 'src/upload/schemas/tpp-data.schema';
import { AuthModule } from 'src/auth/auth.module';
import { BrokerageConfiguration, BrokerageConfigurationSchema } from './schema/brokerage_config.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: LfiData.name, schema: LfiDataSchema },
    { name: TppData.name, schema: TppDataSchema },
    { name:BrokerageConfiguration.name, schema: BrokerageConfigurationSchema },
  ]),
    AuthModule],
  controllers: [BrokerageConfigController],
  providers: [BrokerageConfigService],
})
export class BrokerageConfigModule { }
