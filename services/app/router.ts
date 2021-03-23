import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // routers
  router.resources('competitions', '/api/competitions', controller.competitionEvent);
  router.resources('competition', '/api/competitions/:id', controller.competitionEvent);
  router.resources('competitions', '/api/competitions', controller.competitionEvent);
};
