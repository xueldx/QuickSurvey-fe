import { Module } from '@nestjs/common';
import { StatService } from './stat.service';
import { StatController } from './stat.controller';
import { AnswerModule } from 'src/answer/answer.module';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports:[AnswerModule,QuestionModule],
  providers: [StatService],
  controllers: [StatController]
})
export class StatModule {}
