import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { sign } from 'crypto';
import { Request } from 'express';
import { Model } from 'mongoose';
import { User } from 'src/users/models/users.model';
import { JwtPayload } from './models/jwt-payload.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User')
        private readonly usersModel: Model<User>,
        private readonly jwtService: JwtService
    ){}

    public async createAccessToken(userId:string):Promise<string>{
        return this.jwtService.sign({userId});
    }

    public async validateUser(jwtPayload:JwtPayload): Promise<User>{
        const user = await this.usersModel.findOne({_id:jwtPayload.userId})
        if(!user) throw new UnauthorizedException(`User not found`);
        return user;
    }

    public returnJwtExtractor():(request:Request)=> string {
        return this.jwtExtractor;
    }

    private jwtExtractor(request: Request):string{
        const authHeader = request.headers.authorization;
        if(!authHeader) throw new BadRequestException(`Bad request`)
        const [,token] = authHeader.split(' '); //pega somente o segundo valor
        return token;
    }
}
