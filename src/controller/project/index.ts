import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { ErrorCode, ErrorMessage } from '../../contants/locale';
import Project from '../../entities/project';

export const postProject = async (ctx: Context, next) => {
  const { body } = ctx.request;
  const repository = getRepository(Project);
  const builder = repository.createQueryBuilder();
  const { id, ...restBody } = body;

  try {
    if (id) {
      await builder
        .update(Project)
        .set(restBody)
        .where('id = :id', { id })
        .execute();
    } else {
      await builder
        .insert()
        .into(Project)
        .values(body)
        .execute();
      ctx.body = body;
    }
  } catch (err) {
    ctx.body = { error: err.message, code: ErrorCode.ServerError };
  }

  next();
};

export const getProjectList = async (ctx: Context, next) => {
  const repository = getRepository(Project);

  const [list, total] = await repository.createQueryBuilder().getManyAndCount();

  ctx.body = { list, total };
  next();
};

export const getProjectDetailById = async (ctx: Context, next) => {
  const { query } = ctx.request;
  const { id } = query;

  if (!query.id) {
    ctx.body = { error: '缺少参数', code: 403 };
    next();
    return;
  }

  const repository = getRepository(Project);
  const data = await repository
    .createQueryBuilder('project')
    .where('project.id = :id', { id })
    .getOne();

  ctx.body = data;
  next();
};
