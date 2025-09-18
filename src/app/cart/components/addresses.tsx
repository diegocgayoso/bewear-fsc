"use client";

import { useCreateShippingAddress } from "@/hooks/mutations/use-shipping-address";
import { useUpdateCartShippingAddress } from "@/hooks/mutations/use-update-cart-shipping-address";
import { useUserAddresses } from "@/hooks/queries/use-user-addresses";

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
import { shippingAddressTable } from "@/db/schema";

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

interface AddressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
  defaultShippingAddressId: string | null;
}

const Addresses = ({
  shippingAddresses,
  defaultShippingAddressId,
}: AddressesProps) => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    defaultShippingAddressId || null,
  );
  const createShippingAddressMutation = useCreateShippingAddress();
  const updateCartShippingAddressMutation = useUpdateCartShippingAddress();
  const { data: addresses, isLoading } = useUserAddresses({
    initialData: shippingAddresses,
  });

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

  const handleGoToPayment = async () => {
    if (!selectedAddress || selectedAddress === "add_new") return;

    try {
      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: selectedAddress,
      });
      toast.success("Endereço selecionado com sucesso");
    } catch (error) {
      toast.error("Erro ao selecionar endereço");
      console.error(error);
    }
  };

  const onSubmit = async (values: FormSchemaAddress) => {
    try {
      const newAddress =
        await createShippingAddressMutation.mutateAsync(values);

      if ("error" in newAddress) {
        throw new Error(newAddress.error);
      }

      formAddress.reset();
      setSelectedAddress(newAddress.id);

      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: newAddress.id,
      });

      toast.success("Endereço criado com sucesso");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao criar endereço");
      }
    }
  };

  return (
    <Card className="rounded-2xl py-8">
      <CardHeader>
        <CardTitle>Endereço</CardTitle>
      </CardHeader>
      <CardContent>
        
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
          {addresses?.map((address) => (
            <Card key={address.id}>
              <CardContent className="py-4">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value={address.id} id={address.id} />
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">
                      {address.recipientName} • {address.street},{" "}
                      {address.number}
                      {address.complement && `, ${address.complement}`} -{" "}
                      {address.neighborhood} • {address.city} - {address.state},{" "}
                      {address.zipCode}
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
        {selectedAddress && selectedAddress !== "add_new" && (
          <div className="mt-4">
            <Button
              onClick={handleGoToPayment}
              className="w-full rounded-full"
              disabled={updateCartShippingAddressMutation.isPending}
            >
              {updateCartShippingAddressMutation.isPending
                ? "Processando..."
                : "Ir para pagamento"}
            </Button>
          </div>
        )}

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
                disabled={
                  createShippingAddressMutation.isPending ||
                  updateCartShippingAddressMutation.isPending
                }
              >
                {createShippingAddressMutation.isPending ||
                updateCartShippingAddressMutation.isPending
                  ? "Salvando..."
                  : "Salvar endereço"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};
export default Addresses;
