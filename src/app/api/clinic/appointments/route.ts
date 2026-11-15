import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export const GET = auth(async function GET(request) {

    if (!request.auth) {
        return NextResponse.json({ error: "Acesso não autorizado" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const dataString = searchParams.get("date") as string
    const clinicId = request.auth.user.id

    if (!dataString) {
        return NextResponse.json({ error: "Data não informada" }, { status: 400 })
    }

    if (!clinicId) {
        return NextResponse.json({ error: "Usuário não encontrado" }, { status: 400 })
    }

    try {
        const [year, month, day] = dataString.split("-").map(Number)
        const startDay = new Date(year, month - 1, day, 0, 0, 0, 0)
        const endDay = new Date(year, month - 1, day, 23, 59, 59, 999)


        const appointment = await prisma.appointment.findMany({
            where: {
                userId: clinicId,
                appointmentDate: {
                    gte: startDay,
                    lte: endDay
                },

            },
            include: {
                service: true
            }
        })

        return NextResponse.json(appointment)

    } catch (error) {
        return NextResponse.json({ error: "Erro em buscar agendamentos" }, { status: 400 })
    }


})

