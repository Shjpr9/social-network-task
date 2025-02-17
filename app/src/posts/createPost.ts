import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ResponseModel } from '../interfaces/ResponseModel';

const prisma = new PrismaClient();

async function createPost(req: Request, res: Response) {
    try {
        const post = await prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                author: {
                    connect: {
                        id: req.body.authorId,
                    },
                },
                reaction: {
                    create: {
                        likes: 0,
                        dislikes: 0,
                    },
                },
            },
        });

        const result: ResponseModel = {
            ok: true,
            message: 'Post created successfully',
            data: post,
        };
        res.json(result);
    } catch (error) {
        const result: ResponseModel = {
            ok: false,
            message: "Can't create the post",
            data: error,
        };
        res.json(result);
    }
}

export { createPost };
