import { z } from "zod";
import { User } from "../models/UserModels";
import { Event } from "../models/EventModels";

const EventValidationSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  date: z.date(),
  userID: z.number().int().positive("O id informado deve ser inteiro"),
});

export function checkUser(event: Event) {
  const result = EventValidationSchema.safeParse(event);
  return result;
}
