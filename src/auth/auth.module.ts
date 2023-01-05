import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/stategies/jwt.strategy';
import { UsersSchema } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'User', schema: UsersSchema}
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions:{
        expiresIn: process.env.JWT_EXPIRATION
      }
    })
  ],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports:[
    AuthService
  ]
})
export class AuthModule {}
