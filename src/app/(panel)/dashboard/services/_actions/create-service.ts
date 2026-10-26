"use server"
import { auth } from "@/lib/auth"
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { revalidatePath } from "next/cache"


const serviceSchema = z.object({
    name: z.string().min(1, "O nome do serviço e obrigatório"),
    price: z.number().min(1, "O coloque um preço para continuar"),
    duration: z.number()
})


type CreateServiceData = z.infer<typeof serviceSchema>


export async function createService(formData: CreateServiceData) {

    // Verfica o usuário que esta logado
    const session = await auth()

    // Se não tiver usuario logado pelo ID, ele barra cadastro
    if (!session?.user.id) {
        return {
            error: "Não foi possível cadastrar o serviço"
        }
    }
    // Verifica os Dados do "formaData" estão conforme o "serviceSchema"
    const schema = serviceSchema.safeParse(formData)


    // Se não der sucesso na verificação, barra cadastro
    if (!schema.success) {
        return {
            error: schema.error.issues[0].message
        }
    }

    // Se todas as verficações der "OK"
    try {

        // Vai no modal de service para cadastrar o novo serviço
        const newService = await prisma.service.create({
            data: {
                name: formData.name,
                price: formData.price,
                duration: formData.duration,
                userId: session?.user.id

            }
        })

        revalidatePath("/dashboard/services")

        // Retorna as informações do novo serviço
        return {
            data: newService
        }

        // Se não conseguir cadastrar mostra um erro
    } catch (error) {
        console.log(error)
        return {
            error: "Não foi possível cadastrar o serviço"
        }
    }
}







