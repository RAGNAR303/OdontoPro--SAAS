"use server"

import prisma from "@/lib/prisma"
import { success, z } from 'zod'
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"


const formSchema = z.object({
    appoitmentsId: z.string().min(1, "O ID do appointments e obrigatório")
})

type deleteAppoitmentsData = z.infer<typeof formSchema>


export async function deleteAppoitments(formaData: deleteAppoitmentsData) {

    const session = await auth()

    if (!session?.user.id) {
        return {
            error: "Usuário não autorizado"
        }
    }

    const schema = formSchema.safeParse(formaData)


    if (!schema.success) {
        return {
            error: schema.error.issues[0].message
        }
    }

    try {

        await prisma.appointment.delete({
            where: {
                id: formaData.appoitmentsId,
                userId: session?.user.id
            }
        })

        revalidatePath("/dashboard")

        return {
            data: "Agendamento excluido com sucesso!"
        }


    } catch (error) {

        return {
            error: "Erro en deletar Agendamento"
        }

    }

}