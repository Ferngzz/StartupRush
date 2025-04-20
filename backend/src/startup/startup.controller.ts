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

        if (startups.length === 0) {
            res.status(404).json({
                status: 404,
                message: 'Found no Startups'
            })
        }

        res.status(200).json({
            status: 200,
            data: startups
        })

    } catch (e) {
        console.log(e)
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

export async function updateStartupFlags(req: Request, res: Response) {
    const {id} = req.params;
    const parsedId = parseInt(id);

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
                convincing_pitches: {
                    increment: req.body.convincing_pitches,
                },
                bugged_products: {
                    increment: req.body.bugged_products,
                },
                attracted_users: {
                    increment: req.body.attracted_users,
                },
                pissed_investor: {
                    increment: req.body.pissed_investor,
                },
                fake_news_pitches: {
                    increment: req.body.fake_news_pitches,
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

export async function clearData(req: Request, res: Response) {
    await prisma.startup.deleteMany();

    res.status(200).json({
        status: 200,
    })
}