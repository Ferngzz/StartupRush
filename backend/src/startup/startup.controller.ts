import {Request, Response} from 'express';
import prisma from '../client'

export async function addStartup(req: Request, res: Response) {

    try {
        const data = {
            name: req.body.name,
            slogan: req.body.slogan,
            founding_year: req.body.founding_year,
        }

        const startup = await prisma.startup.create({
            data: data,
        })

        res.status(200).json({
            status: 200,
            data: startup
        });

    } catch (e) {

        res.status(500).json({
            status: 500,
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

        if (startups) {
            res.status(200).json({
                status: 200,
                data: startups
            })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: 500,
            message: 'Something went wrong'
        })
    }
}

export async function updateStartup(req: Request, res: Response) {
    const {id} = req.params;

    try {
        const startup = await prisma.startup.findFirst({
            where: {
                id_startup: id,
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
                id_startup: id,
            },
            data: {
                score: req.body.score,
                convincing_pitches: {
                    increment: req.body.convincing_pitches ? 1 : 0,
                },
                bugged_products: {
                    increment: req.body.bugged_products ? 1 : 0,
                },
                user_traction: {
                    increment: req.body.user_traction ? 1 : 0,
                },
                pissed_investor: {
                    increment: req.body.pissed_investor ? 1 : 0,
                },
                fake_news_pitches: {
                    increment: req.body.fake_news_pitches ? 1 : 0,
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