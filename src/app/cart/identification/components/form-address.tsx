import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NumericFormat, PatternFormat } from "react-number-format";
import { z } from "zod";

const formSchemaAddress = z.object({
  email: z.string().email("Email inválido"),
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  phone: z.string().min(14, "Telefone é obrigatório"),
  cpfOrCnpj: z.string().min(14, "CPF/CNPJ é obrigatório"),
  zipCode: z.string().min(9, "CEP é obrigatório"),
  street: z.string().min(3, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(3, "Bairro é obrigatório"),
  city: z.string().min(3, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
});

type FormSchemaAddress = z.infer<typeof formSchemaAddress>;

const FormAddress = () => {
  const formAddress = useForm<FormSchemaAddress>({
    resolver: zodResolver(formSchemaAddress),
    defaultValues: {
      email: "",
      fullName: "",
      phone: "",
      cpfOrCnpj: "",
      zipCode: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });

  const onSubmit = (data: FormSchemaAddress) => {
    console.log(data);
  };

  return (
    <Form {...formAddress}>
      <p className="text-bold]">Adicionar novo endereço</p>
      <form onSubmit={formAddress.handleSubmit(onSubmit)} className="space-y-4 py-2">
        <FormField
          control={formAddress.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formAddress.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formAddress.control}
          name="phone"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormControl>
                <PatternFormat
                  customInput={Input}
                  format="(##) #####-####"
                  placeholder="Telefone"
                  onValueChange={(values) => {
                    onChange(values.value);
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formAddress.control}
          name="cpfOrCnpj"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormControl>
                <PatternFormat
                  customInput={Input}
                  format="###.###.###-##"
                  placeholder="CPF"
                  onValueChange={(values) => {
                    onChange(values.value);
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formAddress.control}
          name="zipCode"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormControl>
                <PatternFormat
                  customInput={Input}
                  format="#####-###"
                  placeholder="CEP"
                  onValueChange={(values) => {
                    onChange(values.value);
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formAddress.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Endereço" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={formAddress.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Número" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formAddress.control}
            name="complement"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Complemento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={formAddress.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Bairro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={formAddress.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Cidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formAddress.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Estado" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default FormAddress;
