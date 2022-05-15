import { WECHANT_QRCODE_CONNECT_URL, CORP_ID, APPLICATION_AGENT_ID } from '../../../contants/url';
import { serializateUrlWithQuery } from '../../../utils/url';

export const getIdentityUrl = (ctx, next) => {
  const url = serializateUrlWithQuery(WECHANT_QRCODE_CONNECT_URL, {
    appid: CORP_ID,
    agentid: APPLICATION_AGENT_ID,
    redirect_uri: 'https://jweboy.com/wechat/#/wechat/login',
    state: 'web_login',
  });

  ctx.body = url;
  next();
};
