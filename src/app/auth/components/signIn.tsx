"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";


const formSchema = z.object({
    email: z.email("Email inválido."),
    password: z.string("Senha obrigatória!").min(6, "Deve ter pelo menos 6 dígitos."),
})

type FormSchema = z.infer<typeof formSchema>
const SignInForm = () => {
    const formSignIn = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      });

      const onSubmit = (data: FormSchema) => {
          
          console.log("Formulário enviado e validado com sucesso!");
          console.log(data);
      };
      
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Entrar</CardTitle>
                <CardDescription>Faça login para continuar</CardDescription>
            </CardHeader>
            <Form {...formSignIn}>
                <form onSubmit={formSignIn.handleSubmit(onSubmit)}>
                    <CardContent className="grid gap-4">
                    <FormField
                        control={formSignIn.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="E-mail" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        >
                        </FormField>
                        <FormField
                        control={formSignIn.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Senha" {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        >
                        </FormField>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
              <Button type="submit">Entrar</Button>
            </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
export default SignInForm;

