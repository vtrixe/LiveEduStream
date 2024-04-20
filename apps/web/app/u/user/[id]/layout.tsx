import { redirect } from "next/navigation";
import { getSelfById } from "@/services/auth";
import { Navbar } from "@/app/(protected)/_components/navbar";
import { Container } from "@/app/(protected)/_components/container";
import { Sidebar } from "@/app/(protected)/_components/sidebar";
interface UserLayoutProps {
  params: { id : string };
  children: React.ReactNode;
};

const UserLayout = async ({
  params,
  children,
}: UserLayoutProps) => {
  const self = await getSelfById(params.id);

  if (!self) {
    redirect("/");
  }

  return ( 
    <>
    <Navbar />
    <div className="flex h-full pt-20">
      <Sidebar />
      <Container>
        {children}
      </Container>
    </div>
  </>
  );
}
 
export default UserLayout;