import { Application } from 'egg';

export interface TeamInstance {
  name: string;
  slogan?: string;
  logo?: string;
  business_card: string;
  leader: number;
}

export type TeamQueryType = 'all' | 'join' | 'create';

const TeamModel = (app: Application) => {
  const TeamSchema = require('../schema/team')(app);
  const Team = app.model.define('team', TeamSchema);

  return class extends Team {
    static associate() {
      app.model.User.hasMany(Team, { foreignKey: 'leader' });
      Team.belongsToMany(app.model.User, { through: app.model.UserTeam, foreignKey: 'team_id' });
      app.model.User.belongsToMany(Team, { through: app.model.UserTeam, foreignKey: 'user_id' });
    }

    /**
     * 查询报名的团队信息，根据 type 可以获取到 全部、加入的团队、创建的团队
     * @param userID 用户 id
     * @param type 查询类型
     */
    static async query(userID: number, type: TeamQueryType = 'all') {
      const teamWhere: {[key: string]: any} = {};
      if (type === 'join') {
        teamWhere.leader = {
          [app.Sequelize.Op.ne]: userID,
        };
      } else if (type === 'create') {
        teamWhere.leader = {
          [app.Sequelize.Op.eq]: userID,
        };
      }
      const { count, rows } = await Team.findAndCountAll({
        include: [
          {
            model: app.model.User,
            attributes: [
              'id', 'username', 'nickname',
            ],
            through: {
              attributes: [],
              where: {
                user_id: userID,
              },
            },
          },
        ],
        attributes: {
          exclude: [ 'createdAt', 'updatedAt' ],
        },
        where: teamWhere,
      });
      return {
        total: count,
        list: rows,
      };
    }

    /**
     * 根据 id 获取一条数据
     * @param id 团队 id
     */
    static async queryOneData(id: number) {
      return await Team.findByPk(id);
    }

    /**
     * 根据团队 id , 获取团队及其成员数据
     * @param id 团队 id
     */
    static async queryTeamWithMemberById(id: number) {
      return Team.findByPk(id, {
        include: [
          {
            model: app.model.User,
            attributes: [ 'id', 'username', 'nickname' ],
            through: {
              attributes: [],
            },
          },
        ],
        attributes: {
          exclude: [ 'createdAt', 'updatedAt' ],
        },
      });
    }

    /**
     * 修改团队数据
     * @param data 新数据
     * @param teamID 团队 id
     */
    static async updateTeam(data: TeamInstance, teamID: number) {
      return await Team.update(data, {
        where: {
          id: teamID,
        },
      });
    }

    /**
     * 删除团队
     * @param leader 队长 id
     * @param teamID 团队 id
     */
    static async deleteTeam(leader: number, teamID: number) {
      return await Team.destroy({
        where: {
          leader,
          id: teamID,
        },
      });
    }

    /**
     * 保存团队数据
     * @param data 团队信息
     */
    static async save(data: TeamInstance) {
      return await Team.create(data);
    }
  };
};

export default TeamModel;
