import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ResponseModel } from '../interfaces/ResponseModel';

const prisma = new PrismaClient();

async function updateReactions(req: Request, res: Response) {
    try {
        const post = await prisma.post.findFirstOrThrow({
            where: {
                id: parseInt(req.params.postId)
            },
            include: {
                reaction: true
            }
        });
    
        const reaction = await prisma.reaction.update({
            where: {
                id: post.reaction.id
            },
            data: {
                likes: parseInt(req.body.likes), 
                dislikes: parseInt(req.body.dislikes),
            }
        });
        const result: ResponseModel = {
            ok: true,
            message: "Reaction updated successfully",
            data: reaction
        }
        res.json(result);
    } catch (error) {
        const result: ResponseModel = {
            ok: false,
            message: "Can't update the reaction",
            data: error
        }
        res.json(result);
    }
}

export {
    updateReactions
}