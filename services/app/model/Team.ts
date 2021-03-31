import { Application } from 'egg';
import TeamSchema from '../schema/team';

export interface TeamInstance {
  name: string;
  slogan?: string;
  logo?: string;
  business_card: string;
  leader: number;
}

const TeamModel = (app: Application) => {
  const Team = app.model.define('team', TeamSchema);

  return class extends Team {
    static associate() {
      //
    }

    /**
     * 根据 id 获取一条团队数据
     * @param id 团队 id
     */
    static async queryOneById(id: number) {
      return Team.findByPk(id);
    }

    /**
     * 根据团队 id , 获取团队及其成员数据
     * @param id 团队 id
     */
    static async queryTeamWithMemberById(id: number) {
      return Team.findByPk(id, {
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
