import Router from 'koa-router';
import { getProjectDetailById, getProjectList, postProject } from '../controller';

const projectRoutes = new Router();

projectRoutes
  .prefix('/project')
  .post('/', postProject)
  .get('/list', getProjectList)
  .get('/detail', getProjectDetailById);

export default projectRoutes;
