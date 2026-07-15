import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/authStore";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { FadeInUp, ParallaxScroll } from "../components/ui/Animations";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  company: z.string().min(2, { message: "Company must be at least 2 characters" }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function Settings() {
  const { user } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "Admin User",
      email: user?.email || "admin@saas-crm.com",
      company: "Acme Corp",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
      reset(data); // Reset form with new data to clear isDirty
    }, 1000);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto bg-accent text-accent-foreground p-6 rounded-xl">
      <FadeInUp>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Settings</h2>
          <p className="text-white mt-2">
            Manage your account settings and preferences.
          </p>
        </div>
      </FadeInUp>

      <ParallaxScroll offset={15}>
        <Card className="bg-secondary text-secondary-foreground">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription className="text-black">
              Update your account's profile information and email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" {...register("company")} />
                  {errors.company && <p className="text-sm text-destructive">{errors.company.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t border-black p-6 pb-6">
            <div className="text-sm text-emerald-500 font-medium">
              {successMsg}
            </div>
            <div className="space-x-2">
              <Button type="button" variant="outline" onClick={handleReset} disabled={!isDirty || isSaving}>
                Reset
              </Button>
              <Button type="submit" form="profile-form" disabled={!isDirty || isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </ParallaxScroll>
    </div>
  );
}
