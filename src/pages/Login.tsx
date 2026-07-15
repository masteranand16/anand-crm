import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LayoutDashboard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { useAuthStore } from '../store/authStore';
import Sparks from '../components/ui/Sparks';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@saas-crm.com',
      password: 'password123',
      rememberMe: false,
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      login({
        id: '1',
        name: 'Admin User',
        email: data.email,
        role: 'admin',
      });
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#4a0000] via-accent to-[#200000] p-4">
      <Sparks />
      <Card className="relative z-10 w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.5)] border-none">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
              <LayoutDashboard className="h-6 w-6 text-[#FFD700]" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-[#FFD700]" style={{ fontFamily: "'Cinzel', serif" }}>Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm font-medium text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-9 w-9 text-muted-foreground hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                {...register('rememberMe')}
              />
              <Label htmlFor="rememberMe" className="font-normal text-muted-foreground">
                Remember me for 30 days
              </Label>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-accent via-[#900000] to-[#500000] text-[#FFD700] hover:from-[#a00000] hover:to-[#600000] border-none shadow-lg text-md font-bold" style={{ fontFamily: "'Cinzel', serif", letterSpacing: "1px" }} disabled={isLoading}>
              {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t p-6 pb-6">
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <a href="#" className="font-semibold text-primary hover:underline">
              Contact Admin
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
