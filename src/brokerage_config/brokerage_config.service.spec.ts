import { Test, TestingModule } from '@nestjs/testing';
import { BrokerageConfigService } from './brokerage_config.service';

describe('BrokerageConfigService', () => {
  let service: BrokerageConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrokerageConfigService],
    }).compile();

    service = module.get<BrokerageConfigService>(BrokerageConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
