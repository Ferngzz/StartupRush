import {Request, Response} from 'express';
import prisma from '../client'

export async function addTournament(req: Request, res: Response) {

    try {

        const tournament = await prisma.tournament.create({
            data: req.body,
        })
        console.log("tournament: " + tournament)

        res.status(200).json({
            status: 200,
            data: tournament
        });

    } catch (e) {

        res.status(500).json({
            status: 500,
            message: 'Something went wrong'
        });

    }
}

export async function getAllTournaments(req: Request, res: Response) {
    try {
        const tournaments = await prisma.tournament.findMany();

        if (tournaments.length === 0) {
            res.status(404).json({
                status: 404,
                message: 'Found no Tournaments'
            })
        }

        if (tournaments) {
            res.status(200).json({
                status: 200,
                data: tournaments
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


export async function updateTournament(req: Request, res: Response) {
    const {id} = req.params;

    try {
        const tournament = await prisma.tournament.findFirst({
            where: {
                id_tournament: id,
            }
        })

        if (!tournament) {
            res.status(404).json({
                status: 404,
                message: "Tournament not found",
            })
        }

        const updatedTournament = await prisma.tournament.update({
            where: {
                id_tournament: id,
            },
            data: req.body
        })

        res.json(
            {
                status: 200,
                data: updatedTournament,
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
    await prisma.tournament.deleteMany();

    res.status(200).json({
        status: 200,
    })
}