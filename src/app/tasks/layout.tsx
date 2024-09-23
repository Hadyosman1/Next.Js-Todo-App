import verifyTokenForPage from "@/utils/verifyTokenForPage";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  const token = cookies().get("token")?.value;
  const user = verifyTokenForPage(token ?? "");

  if (!user) return redirect("/");

  return (
    <div className="flex flex-col min-h-svh">
      <Header user={user} token={token} />
      <div className="container mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
