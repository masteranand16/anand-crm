import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const activities = [
  {
    id: 1,
    user: "Olivia Martin",
    email: "olivia.martin@email.com",
    action: "upgraded their subscription",
    amount: "+$1,999.00",
    time: "2 hours ago",
    avatar: "OM",
  },
  {
    id: 2,
    user: "Jackson Lee",
    email: "jackson.lee@email.com",
    action: "created a new support ticket",
    amount: "",
    time: "4 hours ago",
    avatar: "JL",
  },
  {
    id: 3,
    user: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    action: "purchased 10 additional seats",
    amount: "+$299.00",
    time: "12 hours ago",
    avatar: "IN",
  },
  {
    id: 4,
    user: "William Kim",
    email: "will@email.com",
    action: "downgraded their plan",
    amount: "-$99.00",
    time: "1 day ago",
    avatar: "WK",
  },
  {
    id: 5,
    user: "Sofia Davis",
    email: "sofia.davis@email.com",
    action: "signed up for a new account",
    amount: "+$39.00",
    time: "2 days ago",
    avatar: "SD",
  },
];

export function RecentActivity() {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3 bg-secondary text-secondary-foreground">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest actions across your application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">
                {activity.avatar}
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.action}
                </p>
              </div>
              <div className="ml-auto font-medium text-sm flex flex-col items-end">
                <span className={activity.amount.startsWith("+") ? "text-emerald-500" : "text-muted-foreground"}>
                  {activity.amount}
                </span>
                <span className="text-xs text-muted-foreground font-normal">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
