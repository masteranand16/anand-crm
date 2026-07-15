import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { KPICard } from "../components/dashboard/KPICard";
import { RevenueChart } from "../components/dashboard/RevenueChart";
import { RecentActivity } from "../components/dashboard/RecentActivity";
import { StaggerContainer, StaggerItem, FadeInUp, ParallaxScroll } from "../components/ui/Animations";

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 bg-accent text-accent-foreground p-6 rounded-xl">
      <FadeInUp>
        <div className="flex items-center justify-between space-y-2 mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight">Dashboard Overview</h2>
        </div>
      </FadeInUp>
      <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StaggerItem>
        <KPICard
          title="Total Revenue"
          value="$45,231.89"
          icon={DollarSign}
          trend="+20.1%"
          trendUp={true}
        />
        </StaggerItem>
        <StaggerItem>
          <KPICard
          title="Active Customers"
          value="+2350"
          icon={Users}
          trend="+180.1%"
          trendUp={true}
        />
        </StaggerItem>
        <StaggerItem>
          <KPICard
          title="Sales"
          value="+12,234"
          icon={CreditCard}
          trend="+19%"
          trendUp={true}
        />
        </StaggerItem>
        <StaggerItem>
          <KPICard
          title="Active Now"
          value="+573"
          icon={Activity}
          trend="-2.4%"
          trendUp={false}
        />
        </StaggerItem>
      </StaggerContainer>
      
      <ParallaxScroll offset={30}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <RevenueChart />
          <RecentActivity />
        </div>
      </ParallaxScroll>
    </div>
  );
}
