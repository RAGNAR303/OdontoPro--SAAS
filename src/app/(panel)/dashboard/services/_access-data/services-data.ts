"use server"

import prisma from "@/lib/prisma"

export async function getAllServices(userId: string) {



    if (!userId) {
        return {
            error: "Não foi possível carregar seu serviçõs"
        }

    }

    try {

        const services = await prisma.service.findMany({
            where: {
                userId: userId,
                status: true
            },

        })

        return {
            data: services
        }

    } catch (error) {
        console.log(error)
        return {
            error: "Erro em buscar serviçõs "
        }
    }
}