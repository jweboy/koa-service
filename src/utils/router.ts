/*
 * @Author: jweboy
 * @Date: 2020-02-20 22:24:34
 * @LastEditors: jweboy
 * @LastEditTime: 2020-03-10 23:22:11
 */
import compose from 'koa-compose';

export function combineRouters(routers) {
  return () => {
    const middleware = [];

    routers.forEach((router) => {
      router.prefix('/api/pet');
      middleware.push(router.routes());
      middleware.push(
        router.allowedMethods({
          // throw: true,
        })
      );
    });

    return compose(middleware);
  };
}
