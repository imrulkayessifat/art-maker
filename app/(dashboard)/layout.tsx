import Navbar from "@/components/navbar";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {

  return ( 
    <div className="h-full relative">
      <main className="md:pl-72 pb-10">
        <Navbar />
        {children}
      </main>
    </div>
   );
}
 
export default DashboardLayout;