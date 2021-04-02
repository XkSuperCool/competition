// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCompetitionEvent from '../../../app/controller/competitionEvent';
import ExportTeam from '../../../app/controller/team';
import ExportUser from '../../../app/controller/user';
import ExportUserEvent from '../../../app/controller/userEvent';
import ExportUserTeam from '../../../app/controller/userTeam';

declare module 'egg' {
  interface IController {
    competitionEvent: ExportCompetitionEvent;
    team: ExportTeam;
    user: ExportUser;
    userEvent: ExportUserEvent;
    userTeam: ExportUserTeam;
  }
}
