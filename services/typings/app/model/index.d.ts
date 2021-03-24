// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCompetitionEvent from '../../../app/model/CompetitionEvent';
import ExportUser from '../../../app/model/User';
import ExportUserEvent from '../../../app/model/UserEvent';

declare module 'egg' {
  interface IModel {
    CompetitionEvent: ReturnType<typeof ExportCompetitionEvent>;
    User: ReturnType<typeof ExportUser>;
    UserEvent: ReturnType<typeof ExportUserEvent>;
  }
}
