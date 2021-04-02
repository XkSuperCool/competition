import { Application } from 'egg';

export interface UserTeamInstance {
  user_id: number;
  team_id: number;
}

const UserTeamModel = (app: Application) => {
  const UserTeamSchema = require('../schema/userTeam')(app);
  const UserTeam = app.model.define('userTeam', UserTeamSchema);

  return class extends UserTeam {
    static associate() {
      app.model.User.belongsToMany(app.model.Team, { through: UserTeam, foreignKey: 'user_id' });
      app.model.Team.belongsToMany(app.model.User, { through: UserTeam, foreignKey: 'team_id' });
    }

    static async deleteUserTeam(user_id: number, team_id: number) {
      return await UserTeam.destroy({
        where: {
          team_id,
          user_id,
        },
      });
    }

    static async save(data: UserTeamInstance) {
      return await UserTeam.create(data);
    }
  };
};

export default UserTeamModel;
