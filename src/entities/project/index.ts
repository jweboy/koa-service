import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  UpdateQueryBuilder,
} from 'typeorm';

@Entity()
class Project {
  @Column()
  @Generated('uuid')
  id: string;

  @PrimaryColumn()
  repo_url: string;

  @Column()
  application: string;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @Column({ length: 100, default: '' })
  remark: string;
}

export default Project;
