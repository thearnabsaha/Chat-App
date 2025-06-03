import { prisma } from '@workspace/db/client';
import { Request, Response } from 'express';

export const CreateChats = async (req: Request, res: Response) => {
    try {
        const chat=await prisma.chat.create({data:{roomId:0,message:"message1",userId:"arnabsaha1"}})
        res.send(chat)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
