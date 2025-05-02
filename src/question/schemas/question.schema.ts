
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

//往数据库中存储的值的类型
@Schema({timestamps:true})
export class Question {
  @Prop({required:true})
  title: string;

  @Prop()
  desc: string;

  @Prop()
  js: string;

  @Prop()
  css: string;

  @Prop({default:false})
  isPublished: boolean;

  @Prop({default:false})
  isStar: boolean;

  @Prop({default:false})
  isDeleted: boolean;

  @Prop({required:true})
  author: string;

  @Prop()
  componentList:{
    fe_id:string,  //组件fe_id需要前端控制，前端生成的
    title:string,
    type:string,
    isLocked:boolean,
    isHidden:boolean,
    props:object
  }[]
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
