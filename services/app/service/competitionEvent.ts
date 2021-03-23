import { Service } from 'egg';
import type { CompetitionEventItem } from '../model/competitionEvent';

export default class competitionEventService extends Service {
  create(data: CompetitionEventItem) {
    const { model } = this.ctx;
    return model.CompetitionEvent.create(data);
  }

  findAll(offset = 0, limit = 10) {
    const { model } = this.ctx;
    return model.CompetitionEvent.findAndCountAll({
      offset,
      limit,
      where: {
        is_hidden: false,
        // todo: 需要过滤已经结束的赛事
      },
      excludes: [
        'event_details',
        'most_person',
        'team_most_person',
        'team_least_person',
        'team_most_count',
        'event_attachment',
        'data_structure',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  findOne(id: number) {
    const { model } = this.ctx;
    return model.CompetitionEvent.findOne({
      where: {
        id,
      },
    });
  }
}
