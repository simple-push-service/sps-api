import { GroupRole } from '@prisma/client';

export class CreateGroupUserDto {
  userId: number;
  role: GroupRole;
}

