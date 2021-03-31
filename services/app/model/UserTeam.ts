import { Application } from 'egg';
import UserTeamSchema from '../schema/userTeam';

const UserTeamModel = (app: Application) => {
  const UserTeam = app.model.define('userTeam', UserTeamSchema);

  return class extends UserTeam {

  };
};

export default UserTeamModel;
