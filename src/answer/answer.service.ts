import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer } from './schemas/answer.schema';

@Injectable()
export class AnswerService {
     constructor(@InjectModel(Answer.name) private readonly answerModel) {}


     //创建问卷答案
     async create(answerInfo){
        if(answerInfo.questionId==null){
            throw new HttpException('缺少问卷id',HttpStatus.BAD_GATEWAY)
        }
        const answer = new this.answerModel(answerInfo);
        return await answer.save();
     }
    
    //单个问卷的答卷数量统计
    async count(questionId: string) {
      if (!questionId) return 0;
      return await this.answerModel.countDocuments({ questionId });
    }

    //单个问卷的答卷列表查询
    async findAll(questionId: string, opt: { page: number; pageSize: number }) {
      if (!questionId) return [];

      const { page = 1, pageSize = 10 } = opt;
      const list = await this.answerModel
         .find({ questionId })
         .skip((page - 1) * pageSize)
         .limit(pageSize)
         .sort({ createdAt: -1 });

      return list;
    }  
}
