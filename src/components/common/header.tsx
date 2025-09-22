"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Home, LogInIcon, LogOutIcon, MenuIcon, ShoppingCart, Truck } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Cart from "./cart";
import { Separator } from "../ui/separator";
import { db } from "@/db";

const Header = () => {
  const { data: session } = authClient.useSession();

  return (
    <header className="flex items-center justify-between p-4">
      <Link href="/">
        <Image src={"/logo.svg"} alt="Bewear" width={100} height={26.14} />
      </Link>
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-5">
              {session?.user ? (
                <>
                  <div className="flex justify-between space-y-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image as string | undefined}
                        />
                        <AvatarFallback>
                          {session?.user?.name?.split(" ")?.[0]?.[0]}
                          {session?.user?.name?.split(" ")?.[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">{session?.user?.name}</h3>
                        <span className="text-muted-foreground block text-xs">
                          {session?.user?.email}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => authClient.signOut()}
                    >
                      <LogOutIcon />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Olá. Faça seu login!</h2>
                  <Button size="icon" asChild variant="outline">
                    <Link href="/auth">
                      <LogInIcon />
                    </Link>
                  </Button>
                </div>
              )}
            </div> 
            <div className="px-6">
              <Separator />
            </div>
            <div className="px-8 flex flex-col gap-5">
              <Link href="/" className="flex items-center text-sm font-semibold">
                <Home className="mr-2 h-4 w-4" />
                Início
              </Link>
              <Link href="/my-orders" className="flex items-center text-sm font-semibold">
                <Truck className="mr-2 h-4 w-4" />
                Meus Pedidos
              </Link>
              <Link href="/my-orders" className="flex items-center text-sm font-semibold">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Carrinho
              </Link>
            </div>
            <div className="px-6">
              <Separator />
            </div>
            
          </SheetContent>
        </Sheet>
        <Cart />
      </div>
    </header>
  );
};

export default Header;
