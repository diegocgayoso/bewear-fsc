"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const FinishOrderButton = () => {
  const [successDialogOpen, setSuccessDialogOpen] = useState(true);
  const finishOrderMutation = useFinishOrder();

  return (
    <>
      <Button
        className="w-full rounded-full"
        size={"lg"}
        onClick={() => finishOrderMutation.mutate()}
        disabled={finishOrderMutation.isPending}
      >
        {finishOrderMutation.isPending && (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Finalizando compra
          </>
        )}
        "Finalizar compra"
      </Button>

      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="text-center">
          <Image
            src="/done-finish-order.svg"
            alt="Pessoa mexendo no celular, vendo que o pedido foi confirmado"
            width={280}
            height={280}
            className="mx-auto"
          />
          <DialogTitle className="mt-4 text-3xl">Pedido Efetuado!</DialogTitle>
          <DialogDescription className="text-center text-lg">
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de “Meus Pedidos”.
          </DialogDescription>
          <DialogFooter>
            <Button className="rounded-full" size={"lg"}>
              Ver meus pedidos
            </Button>
            <Button variant="outline" className="rounded-full" size={"lg"}>
              Página inicial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinishOrderButton;
