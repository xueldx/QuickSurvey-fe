import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel) {}
    
    async create(userData:CreateUserDto){
        const createUser = new this.userModel(userData);
        return await createUser.save();
    }


    async findOne(username:string,password:string){
        return await this.userModel.findOne({username,password});
    }
}
