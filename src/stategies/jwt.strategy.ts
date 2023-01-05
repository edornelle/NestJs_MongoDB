import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "src/auth/models/jwt-payload.model";
import { Strategy } from 'passport-jwt';
import { AuthService } from "src/auth/auth.service";
import { User } from "src/users/models/users.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super({
            jwtFromRequest: authService.returnJwtExtractor(),
            ignoreExpiration:false,
            secretOrKey:process.env.JWT_SECRET
        });
    }

    async validate(jwtPayload: JwtPayload): Promise<User>{
        const user = this.authService.validateUser(jwtPayload);
        if(!user) throw new UnauthorizedException(`Not authorized`);

        return user;

    }

}