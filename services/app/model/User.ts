import { Application } from 'egg';
import CompetitionEventSchema from '../schema/CompetitionEvent';
import UserEventSchema from '../schema/UserEvent';

const UserModel = (app: Application) => {
  const UserSchema = require('../schema/user')(app);
  const User = app.model.define('user', UserSchema);
  const CompetitionEvent = app.model.define('competitionEvent', CompetitionEventSchema);
  const UserEvent = app.model.define('user', UserEventSchema);
  User.belongsToMany(CompetitionEvent, { through: UserEvent, foreignKey: 'user_id' });
  return class extends User {
  };
};

export default UserModel;
