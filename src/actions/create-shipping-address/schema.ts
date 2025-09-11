import { z } from "zod";

export const createShippingAddressSchema = z.object({
  email: z.email("Email inválido"),
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  phone: z.string().min(11, "Telefone é obrigatório"),
  cpfOrCnpj: z.string().min(11, "CPF/CNPJ é obrigatório"),
  zipCode: z.string().min(8, "CEP é obrigatório"),
  street: z.string().min(3, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(3, "Bairro é obrigatório"),
  city: z.string().min(3, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
});

export type CreateShippingAddressSchema = z.infer<typeof createShippingAddressSchema>;
