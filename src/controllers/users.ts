import { Response } from 'express';

import Users from '../models/users';

export const usersCount = (_: any, res: Response) => {
    const users = Users.count();

    return res.status(200).json({ users: users });
};