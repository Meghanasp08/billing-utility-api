import { Test, TestingModule } from '@nestjs/testing';
import { BrokerageConfigController } from './brokerage_config.controller';
import { BrokerageConfigService } from './brokerage_config.service';

describe('BrokerageConfigController', () => {
  let controller: BrokerageConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrokerageConfigController],
      providers: [BrokerageConfigService],
    }).compile();

    controller = module.get<BrokerageConfigController>(BrokerageConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
