import { prisma } from '@workspace/db/client';
import { Request, Response } from 'express';

export const CreateChats = async (req: Request, res: Response) => {
    try {
        const user=await prisma.user.findFirst({where:{username:req.body.username}})
        if(!user){
            res.status(400).json({message:"User is not Valid!"})
            return;
        }
        const room=await prisma.room.findFirst({where:{slug:req.body.slug}})
        if(!room){
            res.status(400).json({message:"Room is not Valid!"})
            return;
        }
        await prisma.chat.create({data:{
            roomId:room?.id,
            message:req.body.message,
            userId:user.id
        }})
        res.status(201).json({message:"New Message Added!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}
