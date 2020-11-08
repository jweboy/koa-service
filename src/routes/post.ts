/*
 * @Author: jweboy
 * @Date: 2020-02-20 21:41:05
 * @LastEditors: jweboy
 * @LastEditTime: 2020-03-11 23:11:31
 */
import Router from 'koa-router';
import { findPosts, createPost } from '../controller/post';

const router = new Router();

const postRouter = router.get('/posts', findPosts).post('/post', createPost);

export default postRouter;
