"use server"

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from 'zod'
import { revalidatePath } from "next/cache";



const formSchema = z.object({
    id: z.string().min(1, "O ID do serviço e obrigatório"),
    name: z.string().min(1, "O nome do serviço e obrigatório"),
    price: z.number().min(1, "O coloque um preço para continuar"),
    duration: z.number()
})

type EditServiceData = z.infer<typeof formSchema>

export async function editService(formData: EditServiceData) {

    const session = await auth()

    if (!session?.user.id) {
        return {
            error: "Não foi posssivel editar o serviço"
        }
    }

    const schema = formSchema.safeParseAsync(formData)

    if ((await schema).error) {
        return {
            error: (await schema).error?.issues[0].message
        }
    }


    try {

        await prisma.service.update({
            where: {
                id: formData.id,
                userId: session.user.id
            },
            data: {
                name: formData.name,
                price: formData.price,
                duration: formData.duration
            }
        })

        revalidatePath("/dashboard/services")


        return {
            data: "Serviço atualizado com sucesso"
        }

    } catch (error) {
        return {
            error: "Não foi posssivel editar o serviço"
        }
    }

}


