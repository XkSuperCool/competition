import { Application } from 'egg';

export interface CompetitionEventItem {
  event_name: string;
  event_banners?: string;
  event_describe?: string;
  event_details?: string;
  start_register_time: string,
  end_register_time: string;
  start_time: string;
  end_time: string;
  most_person?: number;
  sponsor_id: number;
  event_type: 0 | 1 | 2;
  team_most_person?: number;
  team_least_person?: number;
  team_most_count?: number;
  event_attachment?: string;
  data_structure?: string;
  is_hidden?: boolean,
  created_at?: string,
  updated_at?: string,
}

const CompetitionEventModel = (app: Application) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const CompetitionEventSchema = require('../schema/competitionEvent')(app);
  const CompetitionEvent = app.model.define('competitionEvent', CompetitionEventSchema);
  return class extends CompetitionEvent {
    // static associate() {
    //    app.model.CompetitionEvent.belongsTo()
    // }
  };
};

export default CompetitionEventModel;
