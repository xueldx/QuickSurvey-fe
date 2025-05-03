import { Injectable } from '@nestjs/common';
import { QuestionService } from 'src/question/question.service';
import { AnswerService } from 'src/answer/answer.service';

@Injectable()
export class StatService {
   constructor(
       private readonly questionService:QuestionService,
       private readonly answerService:AnswerService,
   ){}

   //在给定的【单选】选项数组中查找与指定值匹配的选项，并返回其对应的文本内容
    // (因为用户提交的不是真的可理解文本，而是文本对应的独一无二的标识value)
    private _getRadioOptText(value, props: any = {}) {
        const { options = [] } = props;
        const length = options.length;

        for (let i = 0; i < length; i++) {
            const item = options[i];
            if (item.value === value) {
                return item.text;
                break;
            }
        }
        return '';
    }
    
    //在给定的【多选】选项数组中查找与指定值匹配的选项，并返回其对应的文本内容
    // (因为用户提交的不是真的可理解文本，而是文本对应的独一无二的标识value)
    private _getCheckboxOptText(value, props: any = {}) {
        const { list = [] } = props;
        const length = list.length;

        for (let i = 0; i < length; i++) {
            const item = list[i];
            if (item.value === value) {
                return item.text;
                break;
            }
        }
        return '无数据';
    }

    /**
 * 生成答案信息，格式如 { componentId1: value1, componentId2: value2 }
 * @param {Object} question question info
 * @param {Array} answerList answer list
 */
    private _genAnswersInfo(question, answerList = []) {
        const res:{[key:string]:string} = {};
        const { componentList = [] } = question;
        answerList.forEach((a) => {         
            const { componentId, value = '' } = a;
            const valueArr=value.split(',')

            // 获取组件信息
            const comp = componentList.filter((c) => c.fe_id === componentId)[0];
            const { type, props = {} } = comp;
            if (type === 'questionRadio') {
                // 单选
                res[componentId] = valueArr
                .map((v) => this._getRadioOptText(v, props))
                .toString();
            } else if (type === 'questionCheckbox') {
                // 多选
                res[componentId] = valueArr
                .map((v) => this._getCheckboxOptText(v, props))
                .toString();
            } else {
                // 其他
                res[componentId] = valueArr.toString();
            }
        });

        return res;
    }

    //生成前端可用的单个问卷的答卷统计信息
    // 获取单个问卷的案卷列表（分页）和数量
    async getQuestionStatListAndCount(
        questionId: string,
        opt: { page: number; pageSize: number }
    ) {
        const noData = { list: [], count: 0 };
        if (!questionId) return noData;

        const q = await this.questionService.findOne(questionId);
        if (q === null) return noData;

        const total = await this.answerService.count(questionId);
        if (total === 0) return noData;

        const answers = await this.answerService.findAll(questionId, opt);

        const list = answers.map((a) => {
            return {
                _id: a._id,
            ...this._genAnswersInfo(q, a.answerList)
            };
        });

        return {
            list,
            total
        };
    }

    // 获取单个组件的统计数据
    async getComponentStat(questionId: string, componentId: string) {
        if (!questionId ||!componentId) return [];
        

        // 获取问卷
        const q = await this.questionService.findOne(questionId); // 问卷
        
        if (q === null) return [];

        // 获取组件
        const { componentList = [] } = q;
        const comp = componentList.filter((c) => c.fe_id === componentId)[0];
        
        if (comp === null) return [];

        const { type, props } = comp;
        if (type!== 'questionRadio' && type!== 'questionCheckbox') {
            // 单组件的，只统计单选和多选。其他不统计
            return [];
        }

        // 获取答卷列表
        const total = await this.answerService.count(questionId);
        
        if (total === 0) return []; // 答卷总数量
        const answers = await this.answerService.findAll(questionId, {
            page: 1,
            pageSize: total, // 获取所有的，不分页
        });


        // 累加各个 value 数量
        const countInfo = {};
        answers.forEach((a) => {
            const { answerList = [] } = a;
            answerList.forEach((a) => {
                if (a.componentId!== componentId) {
                    return
                };
                const valueArr=a.value.split(',')
                
                valueArr.forEach((v) => {
                    if (!countInfo[v]) countInfo[v] = 0;
                    countInfo[v]++; // 累加
                });
            });  
        });

        

        // 整理数据
        const list:{name:string,count:number}[] = [];
        for (const val in countInfo) {
            // 根据 val 计算 text
            let text = '';
            if (type === 'questionRadio') {
                text = this._getRadioOptText(val, props);
            }
            if (type === 'questionCheckbox') {
                text = this._getCheckboxOptText(val, props);
            }
            list.push({ name: text, count: countInfo[val] });
        }
        
        return list;
    }

}
