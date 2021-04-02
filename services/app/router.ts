import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, jwt } = app;
  // routers
  router.resources('competitions', '/api/competitions', controller.competitionEvent);
  router.resources('competition', '/api/competitions/:id', controller.competitionEvent);
  router.resources('userEvents', '/api/userEvents', jwt, controller.userEvent);
  router.resources('teams', '/api/teams', jwt, controller.team);
  router.resources('team', '/api/teams/:id', jwt, controller.team);
  router.resources('teams', '/api/userTeams', jwt, controller.userTeam);
  // @ts-ignore
  router.post('/api/userEventChecked', jwt, controller.userEvent.userEventChecked);
  // @ts-ignore
  router.post('/api/cancel/signUp', jwt, controller.userEvent.cancelSignUp);
  router.post('/api/wxLogin', controller.user.wxLogin);
};
