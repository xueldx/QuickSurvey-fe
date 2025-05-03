export class QuestionDto{
    readonly title:string 
    readonly desc:string 
    readonly js: string
    readonly css: string
    readonly isPublished: boolean;
    readonly isStar: boolean;
    readonly isDeleted: boolean;
    readonly author: string;
    readonly componentList:{
          fe_id:string,  //组件fe_id需要前端控制，前端生成的
          title:string,
          type:string,
          isLocked:boolean,
          isHidden:boolean,
          props:object
    }[]

}