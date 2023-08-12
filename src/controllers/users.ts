import { Response } from 'express';

import Users from '../models/users';

export const usersCount = async (_: any, res: Response) => {
    const users = await Users.find();
    
    return res.status(200).json({ users: users.length });
};