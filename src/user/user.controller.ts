import {Body, Controller, Delete, Get, Param, Put,} from "@nestjs/common";
import {UserData, UserService} from "./user.service";
import {PrismaService} from "../prisma/prisma.service";
import { User } from "@prisma/client"

// could easily re-name this prefix to 'store' if you literally meant that the endpoint should be named /store,
// but in this case I figured 'store' was meant to mean the prefix shared by all endpoints - 'users'
@Controller('users')
export class UserController {
    constructor(
        private prisma: PrismaService,
        private userService: UserService
    ) {}

    @Get (':id')
    async getById(@Param('id') id: string): Promise<User>  {
        return this.userService.findById(parseInt(id));
    }

    @Delete (':id')
    DeleteById(@Param('id') id: string): Promise<User>  {
        return this.userService.deleteUserById(parseInt(id))
    }

    @Put(':id')
    createById(@Body() body: UserData): Promise<Partial<User>> {
        return this.userService.upsert(body);
    }
}