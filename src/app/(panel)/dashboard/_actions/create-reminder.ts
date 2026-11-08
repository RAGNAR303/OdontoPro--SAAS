"use server"

import prisma from "@/lib/prisma"

import { auth } from "@/lib/auth"
import { ReminderFormData, reminderSchema } from "../_components/reminder/reminder-form"
import { revalidatePath } from "next/cache"




export async function createReminder(formaData: ReminderFormData) {

    const session = await auth()


    // Se não tiver usuario logado pelo ID, ele barra cadastro
    if (!session?.user.id) {
        return {
            error: "Não foi possível cadastrar o lembrete"
        }
    }

    const schema = reminderSchema.safeParse(formaData)

    if (!schema.success) {
        return {
            error: schema.error.issues[0].message
        }
    }

    try {
        await prisma.reminder.create({
            data: {
                description: formaData.description,
                userId: session.user.id
            }
        })

        revalidatePath("/dashboard")

        return {
            data: "Lembrete criado com sucesso"
        }

    } catch (error) {
        return {
            error: "Não foi possível cadastrar o lembrete"
        }
    }


}