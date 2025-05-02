import { Controller,Post,Body,Get,Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
// import {AuthGuard} from './auth.guard'
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()  //不需要携带token信息也可以访问
    @Post('login')
    async login(@Body() userInfo: CreateUserDto) {
        const {username,password}=userInfo;
        return await this.authService.signIn(username, password);
    }

    // @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req){
        return req.user;
    }
}