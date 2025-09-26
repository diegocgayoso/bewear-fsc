"use client"
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

const CheckoutCancelPage = () => {
    return (
    <>
      <Header />
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <Image
            src="/cancel-finish-order.svg"
            alt="Cancel"
            width={300}
            height={300}
            className="mx-auto"
          />
          <DialogTitle className="mt-4 text-2xl">Pedido cancelado!</DialogTitle>
          <DialogDescription className="font-medium">
            Seu pedido foi cancelado. Você pode acompanhar o status
            na seção de “Meus Pedidos” e tentar novamente.
          </DialogDescription>

          <DialogFooter>
            <Button className="rounded-full" size="lg">
              Ver meus pedidos
            </Button>
            <Button
              className="rounded-full"
              variant="outline"
              size="lg"
              asChild
            >
              <Link href="/">Voltar para a loja</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Footer />
    </>
  );
}
 
export default CheckoutCancelPage;