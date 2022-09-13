import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (
        data: string | undefined,
        ctx: ExecutionContext,
    ) => {
        const request: Express.Request = ctx
            // execution context here can be switched to use websockets etc.
            .switchToHttp()
            //you can also switch to get response or next
            .getRequest();
        if (data) {
            return request.user[data];
        }
        return request.user;
    },
);