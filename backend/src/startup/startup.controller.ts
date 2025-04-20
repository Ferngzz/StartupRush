import {Request, Response} from 'express';
import prisma from '../client'

export async function addStartup(req: Request, res: Response) {

    try {
        const startup = await prisma.startup.create({
            data: req.body,
        })

        res.status(200).json({
            status: 200,
            data: startup
        });

    } catch (e) {
        console.log(e)

        res.status(404).json({
            status: 404,
            message: 'Something went wrong'
        });
    }
}

export async function getAllStartups(req: Request, res: Response) {
    try {
        const startups = await prisma.startup.findMany();

        res.status(200).json({
            status: 200,
            data: startups
        })
    } catch (e) {
        console.log(e)

        res.status(404).json({
            status: 404,
            message: 'Found no Startups'
        })
    }
}

export async function updateStartupScore(req: Request, res: Response) {
    const {id} = req.params;
    const parsedId = parseInt(id);
    const toIncrement = parseFloat(req.body.increment);

    try {
        const startup = await prisma.startup.findFirst({
            where: {
                id_startup: parsedId,
            }
        })

        if (!startup) {
            res.status(404).json({
                status: 404,
                message: "Startup not found",
            })
        }

        const updatedStartup = await prisma.startup.update({
            where: {
                id_startup: parsedId,
            },
            data: {
                score: {
                    increment: toIncrement,
                }
            }
        })

        res.json(
            {
                status: 200,
                data: updatedStartup,
            }
        )
    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        })
    }
}