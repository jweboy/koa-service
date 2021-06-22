/*
 * @Author: jweboy
 * @Date: 2020-02-20 22:24:34
 * @LastEditors: jweboy
 * @LastEditTime: 2021-06-13 11:05:04
 */
import compose from 'koa-compose';

export function combineRouters(routers) {
  return () => {
    const middleware = [];

    routers.forEach((router) => {
      router.prefix('/api');
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
