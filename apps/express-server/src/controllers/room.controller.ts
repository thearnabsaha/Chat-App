import { prisma } from '@workspace/db/client';
import { Request, Response } from 'express';

export const CreateRoom = async (req: Request, res: Response) => {
    try {
        const user=await prisma.user.findFirst({where:{username:req.body.username}})
        if(!user){
            res.status(400).json({message:"User is not Valid!"})
            return;
        }
        const room=await prisma.room.findFirst({where:{slug:req.body.slug}})
        if(room){
            res.status(411).json({message:"This Room Already Exists!"})
            return;
        }
        const room1 = await prisma.room.create({data:{
            slug:req.body.slug,
            adminId:user?.id
        }})
        res.status(201).json({message:room1.slug+" is created!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}
