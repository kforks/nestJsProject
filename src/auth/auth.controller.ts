import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthDto} from "./dto/auth.dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body('email') email:string,
           @Body('password') password: string,
           dto: AuthDto) {
        return this.authService.signup(dto)
    }

    @Post('login')
    login(@Body('email') email:string,
          @Body('password') password: string,
          dto: AuthDto) {
        return this.authService.login(dto)
    }
};