import { Controller,Post,Body,HttpException,HttpStatus, Redirect ,Get} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Public()
    @Post('register')
    async create(@Body() userDto: CreateUserDto) {
       try {
        return await this.userService.create(userDto);
       } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
       }
    }

    @Get('info')
    @Redirect('/api/auth/profile',302)   //  get  301永久重定向  302 临时重定向(需要检验是否是合法用户)
    async info(){
        return
    }
    
    @Public()
    @Post('login')
    @Redirect('/api/auth/login',307)   //  post  308永久重定向  307 临时重定向(需要检验是否是合法用户)
    async login(){
        return
    }
}