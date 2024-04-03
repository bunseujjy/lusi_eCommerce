import { getCurrentUser } from "@/app/actions/getCurrentUser";
import BarChart from "@/app/components/Dashboard/BarChart";
import RecentOrders from "@/app/components/Dashboard/RecentOrders";
import TopCards from "@/app/components/Dashboard/TopCards";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const order = await prisma.order.findMany();
  const user = await prisma.user.findMany();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/admin/error");
  }
  return (
    <div className="bg-gray-50 dark:bg-transparent text-black dark:text-white mx-5 mt-2 min-[1280px]:mx-16 relative">
      <TopCards order={order} user={user} />
      <div className="py-4 grid md:grid-cols-3 grid-cols-1 gap-4 mb-10">
        <BarChart order={order} />
        <RecentOrders order={order} />
      </div>
    </div>
  );
}
