import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingCTA from "./FloatingCTA";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 overflow-x-hidden">{children}</main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Layout;
