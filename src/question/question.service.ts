import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Question} from './schemas/question.schema';
import { nanoid } from 'nanoid';
import mongoose from 'mongoose';

@Injectable()
export class QuestionService {
    //依赖注入
    constructor(@InjectModel(Question.name) private readonly questionModel){
    }
    // 创建
    async create(username:string){
        const question = new this.questionModel({
            title:'问卷标题'+Date.now(),
            desc:'问卷描述',
            author:username,
            componentList:[{
                fe_id:nanoid(),
                type:'questionInfo',
                title:'问卷信息',
                props:{title:'问卷标题',desc:'问卷描述……'}
            }]
        });
        return await question.save();
    }

    //复制问卷
   async duplicate(id: string, author: string) {
    const question = await this.questionModel.findById(id);
    const newQuestion = new this.questionModel({
        ...question.toObject(),
        _id: new mongoose.Types.ObjectId(), // 生成一个新的 mongodb ObjectId
        title: question.title + ' 副本',
        author,
        isPublished: false,
        isStar: false,
        componentList: question.componentList.map((item) => {
          return {
           ...item,
            fe_id: nanoid()
          };
        })
    });
    return await newQuestion.save();
}

    // 删除某个用户的问卷
    async deleteQuestion(id:string,author:string){
        return await this.questionModel.findOneAndDelete({_id:id,author});
    }

    //删除多个问卷
    async  deleteQuestionList(ids:string[],author:string){
          return await this.questionModel.deleteMany({_id:{$in:ids},author});
    }

    // 更新
    async updateQuestion(id:string,author:string,questionDto){
        return await this.questionModel.updateOne({_id:id,author},questionDto);
    }

    // 查询单个
    async findOne(id:string){
        return await this.questionModel.findById(id)
    };

    // 分页查询
    async findAllList({keyword='',page=1,pageSize=10,isStar,isDeleted=false,author=''}){
        const whereOpt:any = {
            author,
            isDeleted
        };
        if(isStar!=null) whereOpt.isStar=isStar
        if(keyword){
            const reg = new RegExp(keyword,'i');
            whereOpt.title = {$regex:reg};
        }
        
        return  await this.questionModel
        .find(whereOpt)
        .sort({_id:-1})
        .skip((page-1)*pageSize)
        .limit(pageSize);
       
    }

    // 统计总数
    async countAll({keyword='',isStar,isDeleted=false,author=''}){
        const whereOpt:any = {
            author,
            isDeleted
        };
        if(isStar!=null) whereOpt.isStar=isStar
        if(keyword){
            const reg = new RegExp(keyword,'i');
            whereOpt.title = {$regex:reg};
        }
        return await this.questionModel.countDocuments(whereOpt);
    }
}
