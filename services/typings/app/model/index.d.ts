// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCompetitionEvent from '../../../app/model/CompetitionEvent';
import ExportTeam from '../../../app/model/Team';
import ExportUser from '../../../app/model/User';
import ExportUserEvent from '../../../app/model/UserEvent';
import ExportUserTeam from '../../../app/model/UserTeam';

declare module 'egg' {
  interface IModel {
    CompetitionEvent: ReturnType<typeof ExportCompetitionEvent>;
    Team: ReturnType<typeof ExportTeam>;
    User: ReturnType<typeof ExportUser>;
    UserEvent: ReturnType<typeof ExportUserEvent>;
    UserTeam: ReturnType<typeof ExportUserTeam>;
  }
}
