import { Controller, Request,Get,UseGuards, Patch,Query,Param, Body,HttpException,HttpStatus, Post,Delete} from '@nestjs/common';
import {QuestionDto} from './dto/question.dto'
import {QuestionService} from './question.service'
import {AuthGuard} from '../auth/auth.guard'


@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService){} //依赖注入
  
  //创建新问卷
  @Post()
  create(@Request() req){
    const {username}=req.user
    return this.questionService.create(username);
  }

  //复制问卷
  @Post('duplicate/:id')
  duplicate(@Request() req,@Param('id') id:string){
    const {username}=req.user
    return this.questionService.duplicate(id,username);
  }

  //删除单个问卷
  @Delete(':id')
  deleteQuestion(@Param('id') id: string,@Request() req) {
    const {username:author}=req.user
    return this.questionService.deleteQuestion(id,author);
  }

  //删除多个问卷
  @Delete()
  deleteMany(@Body() body,@Request() req){
     const {username:author}=req.user
     const {ids=[]}=body 
     return  this.questionService.deleteQuestionList(ids,author);
  }

  //更新问卷
  @Patch(':id')
  updateQuestion(@Param('id')id:string,@Body() questionDto:QuestionDto,@Request() req){
    const {username:author}=req.user
    return this.questionService.updateQuestion(id,author,questionDto);
  }

  //查询单个问卷
  @Get(':id')
  findone(@Param('id') id:string ){
    return this.questionService.findOne(id);
  }

  //查询所有的问卷列表
  @Get()
  async findAll(
    @Query('keyword') keyword:string,
    @Query('page') page:number,
    @Query('pageSize') pageSize:number,
    @Query('isStar') isStar:boolean=false,
    @Query('isDeleted') isDeleted:boolean=false,
    @Request() req
  ) {
    const {username}=req.user
    const list= await this.questionService.findAllList({keyword,page,pageSize,isStar,isDeleted,author:username});
    const count = await this.questionService.countAll({keyword,isStar,isDeleted,author:username});
    return {
      list,
      count
    }
  }

}
