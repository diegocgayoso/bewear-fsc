"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const formSchema = z
  .object({
    name: z
      .string("Nome obrigatório.")
      .trim()
      .min(3, "Deve ter pelo menos 3 dígitos."),
    email: z.email("Email inválido."),
    password: z
      .string("Senha obrigatória!")
      .min(6, "Deve ter pelo menos 6 dígitos."),
    passwordConfirmation: z
      .string("Senha obrigatória!")
      .min(6, "Deve ter pelo menos 6 dígitos."),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    {
      message: "As senhas devem ser iguais.",
      path: ["passwordConfirmation"],
    },
  );

type FormSchema = z.infer<typeof formSchema>;
const SignUpForm = () => {

  const formSignUp = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    const { data, error} = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Cadastro realizado com sucesso!");
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      }
    })
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cadastre-se</CardTitle>
        <CardDescription>Faça seu cadastro</CardDescription>
      </CardHeader>
      <Form {...formSignUp}>
        <form onSubmit={formSignUp.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FormField
              control={formSignUp.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={formSignUp.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="E-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={formSignUp.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Senha" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={formSignUp.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Confirmar senha"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 p-2">
            <Button type="submit">Criar conta</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
export default SignUpForm;
