// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCompetitionEvent from '../../../app/model/competitionEvent';

declare module 'egg' {
  interface IModel {
    CompetitionEvent: ReturnType<typeof ExportCompetitionEvent>;
  }
}
