import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TaskExist = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.params[data];
    // console.log('🚀 ~ request:', userId, data);

    return userId;
  },
);
