import Navbar from "@/components/dashboard/navbar";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {

  return ( 
    <div className="h-full relative">
      <main className="pb-10">
        <Navbar />
        {children}
      </main>
    </div>
   );
}
 
export default DashboardLayout;