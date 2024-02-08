import { Logo } from "@/components/logo";
import { Navbar } from "../(landing)/_components/Navbar";
const AuthLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <div className="h-full flex flex-col items-center justify-center space-y-6">
           <Navbar />
      <Logo />
      {children}
    </div>
  );
};
 
export default AuthLayout;