import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { ErrorCode } from '../../contants/locale';
import User from '../../entities/user';

// TODO: 可优化
const compareEnCodeStr = (sourceText, compareText) => {
  return new Promise((resolve, reject) => {
    compare(sourceText, compareText, (err, isOk) => {
      if (err) {
        reject(err);
      }
      resolve(isOk);
    });
  });
};

export const postUserRegister = async (ctx: Context, next) => {
  const { body } = ctx.request;
  const repository = getRepository(User);
  const user = await repository
    .createQueryBuilder('user')
    .where('user.email = :email', { email: body.email })
    .getOne();

  if (user) {
    ctx.body = { msg: '当前用户已存在' };
  }

  // TODO: 可优化
  const salt = genSaltSync(10);
  const encodePassword = hashSync(body.password, salt);

  await repository
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      email: body.email,
      password: encodePassword,
    })
    .execute();
  next();
};

export const postUserLogin = async (ctx: Context, next) => {
  const { body } = ctx.request;
  const repository = getRepository(User);
  const user = await repository
    .createQueryBuilder('user')
    .where('user.email = :email', { email: body.email })
    .getOne();

  if (!user) {
    ctx.body = { error: '用户不存在', code: ErrorCode.InvalidUser };
  } else {
    const { password, ...restProps } = user;
    try {
      const isEqual = await compareEnCodeStr(body.password, user.password);
      ctx.body = isEqual
        ? restProps
        : {
            error: '密码错误',
            code: ErrorCode.InvalidPassword,
          };
    } catch (err) {
      ctx.body = { error: err.message, code: ErrorCode.ServerError };
    }
  }
  next();
};
