"use server"

import prisma from "@/lib/prisma"


export async function getReminder({ userId }: { userId: string }) {

    if (!userId) {
        console.log("Não foi encontrado nenhum usario ")
        return []
    }


    try {


        const reminder = await prisma.reminder.findMany({
            where: {
                userId: userId
            }
        })

        return reminder

    } catch (error) {
        console.log(error)
        return []
    }

}