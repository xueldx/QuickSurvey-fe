import { Controller,Body,Post } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('answer')
export class AnswerController {
   constructor(private readonly answerService: AnswerService){} //依赖注入

   @Public()
   @Post()
   async create(@Body() answerInfo){
    return await this.answerService.create(answerInfo)
   }

}
