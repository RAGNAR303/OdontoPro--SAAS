"use server"

import prisma from "@/lib/prisma"

export async function getTimesAppoitments({ userId }: { userId: string }) {


    if (!userId) {
        return {
            userId: "",
            times: []
        }
    }

    try {

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                id: true,
                times: true
            }
        })


        if (!user) {
            return {
                userId: "",
                times: []
            }
        }

        return {
            userId: user.id,
            times: user.times
        }

    } catch (error) {
        return {
            userId: "",
            times: []
        }
    }
}