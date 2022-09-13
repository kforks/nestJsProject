import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {User} from "@prisma/client";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findById(id: number): Promise<User> {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: id
                }
            })
            delete user.hash;
            return user;
        } catch (e) {
            return e
        }
    }


    // async upsertBulk(body: {email: string, password: string }): Promise<User[]> {
    //     const createMany = await this.prisma.user.createMany({
    //         data: [
    //             { firstName: 'Bob', email: 'bob@prisma.io' },
    //             { firstName: 'Bobo', email: 'bob@prisma.io' },
    //             { firstName: 'Yewande', email: 'yewande@prisma.io' },
    //             { firstName: 'Angelique', email: 'angelique@prisma.io'},
    //         ],
    //         skipDuplicates: true, // Skip 'Bobo'
    //     })
    //     return createMany
    // }

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
            },
        })

        return upsertUser;
    }
}

export interface UserData {
    email: string,
    firstName: string,
    lastName: string
}