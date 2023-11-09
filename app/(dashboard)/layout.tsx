import Navbar from "@/components/dashboard/navbar";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {

  return ( 
    <div className="h-full">
      <main className="pb-10">
        {children}
      </main>
    </div>
   );
}
 
export default DashboardLayout;