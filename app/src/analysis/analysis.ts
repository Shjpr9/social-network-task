import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ResponseModel } from '../interfaces/ResponseModel';

const prisma = new PrismaClient();

async function top5Posts(req: Request, res: Response) {
    try {
        const posts = await prisma.post.findMany({
            include: {
                reaction: true,
            },
            orderBy: {
                reaction: {
                    likes: 'desc',
                },
            },
            take: 5,
        });

        const result: ResponseModel = {
            ok: true,
            message: 'Top 5 posts by likes',
            data: posts,
        };
        res.json(result);
    } catch (error) {
        const result: ResponseModel = {
            ok: false,
            message: "Can't get top 5 posts",
            data: error,
        };
        res.json(result);
    }
}

async function worst5Posts(req: Request, res: Response) {
    try {
        const posts = await prisma.post.findMany({
            include: {
                reaction: true,
            },
            orderBy: {
                reaction: {
                    dislikes: 'desc',
                },
            },
            take: 5,
        });

        const result: ResponseModel = {
            ok: true,
            message: 'Worst 5 posts by dislikes',
            data: posts,
        };
        res.json(result);
    } catch (error) {
        const result: ResponseModel = {
            ok: false,
            message: "Can't get worst 5 posts",
            data: error,
        };
        res.json(result);
    }
}

export { top5Posts, worst5Posts };
