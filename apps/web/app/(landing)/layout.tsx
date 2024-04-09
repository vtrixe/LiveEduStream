import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const MarketingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full bg bg-white dark:bg-black dark: text-white">
      <Navbar />
      <main className="h-full flex flex-col items-center justify-center space-y-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;