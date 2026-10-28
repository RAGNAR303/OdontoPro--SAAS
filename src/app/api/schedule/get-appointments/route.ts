"use server"

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";




export async function GET(request: NextRequest) {
    // Buscar sem tem agendamentos (appointments) em uma data especifica de uma clinica

    const { searchParams } = request.nextUrl

    const userId = searchParams.get("userId")
    const dataParam = searchParams.get('date')

    if (!userId || userId === 'null' || !dataParam || dataParam === "null") {
        return NextResponse.json({
            error: "Nenhum agendamento encontrado"
        }, {
            status: 400
        })

    }

    try {
        const [year, month, day] = dataParam.split("-").map(Number)
        const startDay = new Date(year, month - 1, day, 0, 0, 0)
        const endDay = new Date(year, month - 1, day, 23, 59, 59, 999)

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })

        if (!user) {
            return NextResponse.json({
                error: "Nenhum agendamento encontrado"
            }, {
                status: 400
            })

        }

        const appointments = await prisma.appointment.findMany({
            where: {
                userId: userId,
                appointmentDate: {
                    gte: startDay,
                    lte: endDay
                }
            },
            include: {
                service: true
            }
        })

        console.log("Agendamentos", appointments)

        const blockedSlots = new Set<string>()

        for (const apt of appointments) {
            // Ex: apt.time = "10:00", apt.service.duration = 60 (1h)
            const requiredSlots = Math.ceil(apt.service?.duration! / 30)
            const startIndex = user.times.indexOf(apt.time)

            console.log(requiredSlots, startIndex)

            if (startIndex !== -1) {
                for (let i = 0; i < requiredSlots; i++) {
                    const blockedSlot = user.times[startIndex + 1]
                    if (blockedSlot) {
                        blockedSlots.add(blockedSlot)
                    }
                }
            }
        }

        const blockedTimes = Array.from(blockedSlots)


        console.log("blockedTimes:", blockedTimes)
        return NextResponse.json(blockedTimes)


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: "Nenhum agendamento encontrado"
        }, {
            status: 400
        })
    }

}