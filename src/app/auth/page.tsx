import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./components/signIn";
import SignUpForm from "./components/signUp";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

const Auth = () => {
  return (
    <>
    <Header />
    <div className="flex w-full flex-col gap-6 p-6">
      <Tabs defaultValue="sign-in">
        <TabsList className="w-full sm:max-w-96 sm:mx-auto">
          <TabsTrigger value="sign-in">Entrar</TabsTrigger>
          <TabsTrigger value="sign-up">Cadastrar</TabsTrigger>
        </TabsList>
          <TabsContent value="sign-in"  className="w-full sm:max-w-96 sm:mx-auto">
            <SignInForm />
          </TabsContent>
          <TabsContent value="sign-up" className="w-full sm:max-w-96 sm:mx-auto">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  )
}
export default Auth;