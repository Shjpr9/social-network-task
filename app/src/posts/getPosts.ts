import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ResponseModel } from '../interfaces/ResponseModel';

const prisma = new PrismaClient();

async function getAllPosts(req: Request, res: Response) {
    try {
        const posts = await prisma.post.findMany();
        const result: ResponseModel = {
            ok: true,
            message: 'Got posts successfully',
            data: posts,
        };
        res.json(result);
    } catch (error) {
        const result: ResponseModel = {
            ok: false,
            message: "Can't get posts",
            data: error,
        };
        res.json(result);
    }
}

async function getPost(req: Request, res: Response) {
    try {
        const post = await prisma.post.findFirstOrThrow({
            where: {
                id: parseInt(req.params.id),
            },
            select: {
                title: true,
                content: true,
                authorId: true,
                reaction: {
                    select: {
                        likes: true,
                        dislikes: true,
                    },
                }
            }
        });
        const result: ResponseModel = {
            ok: true,
            message: 'Post found successfully',
            data: post,
        };
        res.json(result);
    } catch (error) {
        const result: ResponseModel = {
            ok: false,
            message: "Can't get the post",
            data: error,
        };
        res.json(result);
    }
}

async function getUserPosts(req: Request, res: Response) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId: parseInt(req.params.id),
            },
        });
        const result: ResponseModel = {
            ok: true,
            message: 'Post found successfully',
            data: posts,
        };
        res.json(result);
    } catch (error) {
        const result: ResponseModel = {
            ok: false,
            message: "Can't get the post",
            data: error,
        };
        res.json(result);
    }
}

export { getAllPosts, getPost, getUserPosts };
