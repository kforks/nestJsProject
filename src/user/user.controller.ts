import {Body, Controller, Delete, Get, Param, Put, Req,} from "@nestjs/common";
import {UserData, UserService} from "./user.service";
import {PrismaService} from "../prisma/prisma.service";
import { User } from "@prisma/client"
import {GetUser} from "../auth/decorator";

@Controller('users')
export class UserController {
    constructor(
        private prisma: PrismaService,
        private userService: UserService
    ) {}

    // @Get (':id')
    // async getById(@Param('id') id: string): Promise<User>  {
    //     return this.userService.findById(parseInt(id));
    // }

    @Get(':ids')
    async getByIds(@Param() params) {
        return this.userService.findByIds([params.ids]);
    }

    @Delete (':id')
    DeleteById(@Param('id') id: string): Promise<User>  {
        return this.userService.deleteUserById(parseInt(id))
    }

    @Put(':email')
    createOrUpdate(@Body() body: UserData): Promise<Partial<User>> {
        return this.userService.upsert(body);
    }
}