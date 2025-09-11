"use client";

import { useCreateShippingAddress } from "@/hooks/mutations/use-shipping-address";
import { useShippingAddresses } from "@/hooks/queries/use-shipping-addresses";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import z from "zod";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PatternFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const formSchemaAddress = z.object({
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

type FormSchemaAddress = z.infer<typeof formSchemaAddress>;

const Addresses = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const createShippingAddressMutation = useCreateShippingAddress();
  const { data: shippingAddresses, isLoading: isLoadingAddresses } = useShippingAddresses();

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

  const onSubmit = async (values: FormSchemaAddress) => {
    console.log(values);
    try {
      await createShippingAddressMutation.mutateAsync(values);
      toast.success("Endereço criado com sucesso");
      formAddress.reset();
      setSelectedAddress(null);
    } catch (error) {
      toast.error("Erro ao criar endereço");  
    }
  };

  return (
    <Card className="rounded-2xl py-8">
      <CardHeader>
        <CardTitle>Endereço</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
          {shippingAddresses?.map((address) => (
            <Card key={address.id} className="mb-4">
              <CardContent className="py-4">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value={address.id} id={address.id} />
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm ">
                      {address.recipientName} • {address.street}, {address.number}
                      {address.complement && `, ${address.complement}`} - {address.neighborhood} • {address.city} - {address.state}, {address.zipCode}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label htmlFor="add_new">Adicionar novo endereço</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>

        {selectedAddress === "add_new" && (
          <Form {...formAddress}>
            <Separator color="gray" className="my-4" />
            <p className="py-4 text-sm font-bold">Adicionar novo endereço</p>
            <form
              onSubmit={formAddress.handleSubmit(onSubmit)}
              className="space-y-4 py-2"
            >
              <FormField
                control={formAddress.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        {...field}
                        className="p-6 placeholder:text-sm"
                      />
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
                      <Input
                        placeholder="Nome completo"
                        {...field}
                        className="p-6 placeholder:text-sm"
                      />
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
                        className="p-6 placeholder:text-sm"
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
                        className="p-6 placeholder:text-sm"
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
                        className="p-6 placeholder:text-sm"
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
                      <Input
                        placeholder="Endereço"
                        {...field}
                        className="p-6 placeholder:text-sm"
                      />
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
                        <Input
                          placeholder="Número"
                          {...field}
                          className="p-6 placeholder:text-sm"
                        />
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
                        <Input
                          placeholder="Complemento"
                          {...field}
                          className="p-6 placeholder:text-sm"
                        />
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
                      <Input
                        placeholder="Bairro"
                        {...field}
                        className="p-6 placeholder:text-sm"
                      />
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
                        <Input
                          placeholder="Cidade"
                          {...field}
                          className="p-6 placeholder:text-sm"
                        />
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
                        <Input
                          placeholder="Estado"
                          {...field}
                          className="p-6 placeholder:text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="mt-2 w-full rounded-full font-bold disabled:opacity-50"
                disabled={createShippingAddressMutation.isPending}
              >
                {createShippingAddressMutation.isPending ? "Salvando..." : "Salvar endereço"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};
export default Addresses;
