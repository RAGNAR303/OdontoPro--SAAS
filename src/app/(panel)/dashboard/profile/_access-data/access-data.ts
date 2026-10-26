'use server'

import prisma from "@/lib/prisma";

interface DataProfileProps {
    userID: string
}

export async function dataProfile({ userID }: DataProfileProps) {

    try {
        if (!userID) {
            return null
        }


        const user = await prisma.user.findFirst({
            where: {
                id: userID
            },
            include: {
                subscription: true
            }
        })

        if (!user) {
            return null
        }

        return user
    } catch (error) {
        console.log(error)
    }


}