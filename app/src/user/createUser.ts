import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ResponseModel } from '../interfaces/ResponseModel';

const prisma = new PrismaClient();

async function createUser(req: Request, res: Response) {
    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
            }
        });

        const result: ResponseModel = {
            ok: true,
            message: "User created successfully",
            data: user
        }
        res.json(result);
    } catch (error) {
        const result: ResponseModel = {
            ok: false,
            message: "Can't create the user",
            data: error
        }
        res.json(result);
    }
}

export {
    createUser,
}