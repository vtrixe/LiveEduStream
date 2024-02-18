import { Logo } from "@/components/logo";
import { Navbar } from "./_components/navbar";
import { Container } from "./_components/container";
import { Sidebar } from "./_components/sidebar";
const AuthLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <div className="flex h-full pt-20">
           <Navbar />
           <Sidebar />
           <Container>
           {children}
           </Container>
    </div>
  );
};
 
export default AuthLayout;