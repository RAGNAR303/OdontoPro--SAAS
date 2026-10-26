"use server"

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from 'zod'
import { revalidatePath } from "next/cache";

const formSchema = z.object({
    id: z.string().min(1, "O ID do serviço e obrigatório")
})

type DeleteServiceData = z.infer<typeof formSchema>

export async function deleteService(formData: DeleteServiceData) {

    const session = await auth()

    if (!session?.user.id) {
        return {
            error: "Não foi posssivel deletar o serviço"
        }
    }

    const schema = formSchema.safeParseAsync(formData)

    if ((await schema).error) {
        return {
            error: (await schema).error?.issues[0].message
        }
    }

    try {

        const data = await prisma.service.update({
            where: {
                id: formData.id,
                userId: session.user.id
            },
            data: {
                status: false
            }
        })

        revalidatePath("/dashboard/services")

        return {
            data: `Servico ${data.name} excluido com sucesso!`
        }

    } catch (error) {
        console.log(error)
        return {
            error: "Não foi posssivel deletar o serviço"
        }
    }

}