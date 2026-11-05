"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from 'zod'


const formSchema = z.object({
    reminderId: z.string().min(1, "O id do lembrete e obrigatório")
})

type FormData = z.infer<typeof formSchema>

export async function deleteReminder(formData: FormData) {


    const schema = formSchema.safeParse(formData)

    console.log(schema.error?.issues)

    if (!schema.success) {
        return {
            error: schema.error.issues[0].message
        }
    }


    try {

        await prisma.reminder.delete({
            where: {
                id: formData.reminderId
            }
        })

        revalidatePath("/dashboard")

        return {
            data: "Lembrete deletado!"
        }

    } catch (error) {
        console.log(error)
        return {
            error: "Erro em deletar lembrete"
        }
    }

}