import Header from "@/components/common/header";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Addresses from "./components/addresses";

const IdentificationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const cart = await db.query.CartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      items: true,
    },
  });
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }
  // const 


  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <Addresses />
        <div className="flex flex-col rounded-2xl border border-gray-500 px-5 py-8">
          <h1>Seu pedido</h1>
          <p>. . .</p>
        </div>
      </div>
    </>
  );
};

export default IdentificationPage;
