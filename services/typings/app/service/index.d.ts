// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportCompetitionEvent from '../../../app/service/competitionEvent';
import ExportTeam from '../../../app/service/team';
import ExportUser from '../../../app/service/user';
import ExportUserEvent from '../../../app/service/userEvent';
import ExportUserTeam from '../../../app/service/userTeam';

declare module 'egg' {
  interface IService {
    competitionEvent: AutoInstanceType<typeof ExportCompetitionEvent>;
    team: AutoInstanceType<typeof ExportTeam>;
    user: AutoInstanceType<typeof ExportUser>;
    userEvent: AutoInstanceType<typeof ExportUserEvent>;
    userTeam: AutoInstanceType<typeof ExportUserTeam>;
  }
}
