"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateProfileschema = z.object({
  name: z.string().min(1, "O Nome e obrigatório"),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.boolean(),
  timeZone: z.string().min(1, "O fuso horario e obrigatório"),
  times: z.array(z.string()),
});

type FormProfile = z.infer<typeof updateProfileschema>;

export async function updateProfile(formaData: FormProfile) {
  const schema = updateProfileschema.safeParse(formaData);

  if (!schema.success) {
    return {
      error: `Erro em validar os dados ${schema.error}`,
    };
  }

  const session = await auth();

  if (!session?.user.id) {
    return {
      error: "Não foi possivel acessar ID do usuario",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: formaData,
    });

    revalidatePath("/dashboard/profile");

    return {
      data: "Usuário atualizado com sucesso!",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Não foi possivel cadastrar usuário",
    };
  }
}
