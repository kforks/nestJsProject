import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {User} from "@prisma/client";
import * as argon from "argon2";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    // async findById(id: number): Promise<User> {
    //     try {
    //         const user = await this.prisma.user.findUnique({
    //             where: {
    //                 id: id
    //             }
    //         })
    //         delete user.hash;
    //         return user;
    //     } catch (e) {
    //         return e
    //     }
    // }

    async findByIds(ids: string[]): Promise<any[]> {
        let idsArray = ids[0].split(',');
        try {
            let users = [];
            for (let id of idsArray) {
                let user = await this.prisma.user.findUnique({
                    where: {
                        id: Number(id)
                    }
                })
                users.push(user)
            }
            return users
        } catch (e) {
            return e
        }
    }

    async deleteUserById(
        userId: number,
    ) {
        try {
            console.log(userId)

            const deletedUser = await this.prisma.user.delete({
                where: {
                    id: userId,
                },
            })
            delete deletedUser.hash
            return deletedUser
        } catch (e) {
            console.log('Error deleting user Id: ' + e)
            return e
        }
    }

    async upsert(body: UserData): Promise<Partial<User>> {
        console.log(body)

        const upsertUser = await this.prisma.user.upsert({
            where: {
                email: body.email,
            },
            update: {
                firstName: body.firstName,
            },
            create: {
                email: body.email,
                firstName: body.firstName,
                hash: String(argon.hash(body.password))
            },
        })
        delete upsertUser.hash
        return upsertUser;
    }
}

export interface UserData {
    email: string,
    password?: string,
    firstName?: string,
    lastName?: string
}