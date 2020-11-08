/*
 * @Author: jweboy
 * @Date: 2020-02-20 22:51:38
 * @LastEditors: jweboy
 * @LastEditTime: 2020-03-14 17:05:00
 */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
class Post {
  @PrimaryGeneratedColumn() //  自
  id: number;

  @Column({
    length: 50,
  })
  title: string;

  @Column({
    length: 300,
  })
  content: string;

  @CreateDateColumn()
  createDate: Date;

  @Column('simple-array')
  pictures: string[];
}

export default Post;
