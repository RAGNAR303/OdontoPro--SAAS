"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from 'zod'

const formSchema = z.object({
    name: z.string().min(1, "O nome e obrigatório"),
    email: z.string().min(1, "O e-mail e obrigatório"),
    phone: z.string().min(1, "O telefone e obrigatório"),
    date: z.date(),
    time: z.string().min(1, "O horário e obrigatório"),
    serviceId: z.string().min(1, "O serviço e obrigatório"),
    clinicId: z.string(),
})

type CreateAppointmentData = z.infer<typeof formSchema>

export async function createAppointment(formaData: CreateAppointmentData) {

    if (!formaData) {
        return {
            error: "Erro em realizar o cadastro"
        }
    }


    const schema = formSchema.safeParse(formaData)

    if (!schema.success) {
        return {
            error: schema.error.issues[0].message
        }
    }

    const date = new Date(formaData.date)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    const appointmentDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0))

    console.log("Data agendada", appointmentDate)
    try {


        const createAppointment = await prisma.appointment.create({
            data: {
                name: formaData.name,
                email: formaData.email,
                phone: formaData.phone,
                appointmentDate: appointmentDate,
                time: formaData.time,
                serviceId: formaData.serviceId,
                userId: formaData.clinicId
            }
        })

        revalidatePath('/clinics/[id]')

        return {
            data: createAppointment
        }


    } catch (error) {
        console.log(error)
        return {
            error: "Erro ao cadatrar agendamento"
        }
    }

}

