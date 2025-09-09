"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import z, { number } from "zod";
import FormAddress from "./form-address";
import { Separator } from "@/components/ui/separator";

const Addresses = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  return (
    <Card className="rounded-2xl border border-gray-500 py-8">
      <CardHeader>
        <CardTitle>Endereço</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label htmlFor="add_new">Adicionar novo endereço</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
        <Separator color="gray" className="my-4" />

        {selectedAddress === "add_new" && <FormAddress />}
      </CardContent>
    </Card>
  );
};

export default Addresses;
