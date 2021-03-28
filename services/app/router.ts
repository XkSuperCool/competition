import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, jwt } = app;
  // routers
  router.resources('competitions', '/api/competitions', controller.competitionEvent);
  router.resources('competition', '/api/competitions/:id', controller.competitionEvent);
  // @ts-ignore
  router.resources('userEvents', '/api/userEvents', jwt, controller.userEvent);
  // @ts-ignore
  router.post('/api/userEventChecked', jwt, controller.userEvent.userEventChecked);
  router.post('/api/wxLogin', controller.user.wxLogin);
};
