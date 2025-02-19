import { z } from "zod";
import { User } from "../models/UserModels";

const UserValidationSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(25, "Nome pode ter no máximo 50 caracteres"),
  email: z.string().email("E-mail deve ser válido"),
  password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "Deve ter uma letra maiúscula")
    .regex(/[a-z]/, "Deve ter uma letra minúscula")
    .regex(/[0-9]/, "Deve ter um número")
    .regex(/[^A-Za-z0-9]/, "Deve ter um caractere especial"),
});

export function checkUser(user: User) {
  const result = UserValidationSchema.safeParse(user);
  return result;
}
