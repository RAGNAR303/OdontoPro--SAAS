"use server"
import prisma from "@/lib/prisma"

export async function getAllInfoClinic({ userId }: { userId: string }) {

    try {
        if (!userId) {
            return null
        }

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            include: {
                subscription: true,
                services: {
                    where: {
                        status: true
                    }
                }
            }
        })

        if (!user) {
            return null
        }

        return user

    } catch (error) {
       

        return "Não foi possivel obter informações da clinica"
    }


}