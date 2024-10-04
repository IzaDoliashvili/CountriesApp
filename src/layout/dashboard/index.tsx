import { Footer } from "@/components/footer/footer"
import { Header } from "@/components/header/header";
import { PageContainer } from "../../components/page-container/page-container";
import { Outlet } from "react-router-dom";



const DashboardLayout = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Footer />
    </>
  );
  };

export default DashboardLayout;