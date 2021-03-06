import { Service } from 'egg';
import type { CompetitionEventItem } from '../model/CompetitionEvent';

export default class competitionEventService extends Service {
  create(data: CompetitionEventItem) {
    const { model } = this.ctx;
    return model.CompetitionEvent.save(data);
  }

  findAll(offset = 0, limit = 10, keywords?: string, eventType?: number) {
    const { model } = this.ctx;
    return model.CompetitionEvent.query(offset, limit, keywords, eventType);
  }

  findOne(id: number) {
    const { model } = this.ctx;
    return model.CompetitionEvent.getOneDataById(id);
  }
}
