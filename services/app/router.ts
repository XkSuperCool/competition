import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // routers
  router.resources('competitions', '/api/competitions', controller.competitionEvent);
  router.resources('competition', '/api/competitions/:id', controller.competitionEvent);
  router.resources('userEvents', '/api/userEvents', controller.userEvent);
  router.post('/api/userEventChecked', controller.userEvent.userEventChecked);
  router.post('/api/wxLogin', controller.user.wxLogin);
};
