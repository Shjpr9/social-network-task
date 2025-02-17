import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ResponseModel } from '../interfaces/ResponseModel';

const prisma = new PrismaClient();

async function getUser(req: Request, res: Response) {
    try {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                id: parseInt(req.params.id),
            },
            include: {
                posts: true,
            },
        });

        const result: ResponseModel = {
            ok: true,
            message: 'Got user successfully',
            data: user,
        };
        res.json(result);
    } catch (error) {
        const result: ResponseModel = {
            ok: false,
            message: "Can't get the user",
            data: error,
        };
        res.json(result);
    }
}

export { getUser };
