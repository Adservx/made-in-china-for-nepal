"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.fullName,
          company_name: values.companyName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/login?message=Registration successful! Please sign in.");
    }
  }

  return (
    <div className="container relative flex flex-col items-center justify-center min-vh-100 py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block mb-8">
            <div className="flex flex-col items-center text-center leading-none">
              <span className="text-3xl font-black tracking-tighter text-[#D81B12]">MADE-IN-CHINA</span>
              <span className="bg-[#D81B12] text-white rounded-full px-3 py-1 text-[10px] mt-1 font-bold tracking-widest uppercase">FOR NEPAL</span>
            </div>
          </Link>
        </div>

        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-xl">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold tracking-tight text-center">Create Account</CardTitle>
            <CardDescription className="text-center text-slate-500">
              Join Nepal&apos;s leading B2B sourcing platform
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ms-1">Full Name</label>
                  <Input
                    {...form.register("fullName")}
                    placeholder="John Doe"
                    className="bg-slate-100/50 border-slate-200 focus:bg-white transition-all h-12"
                  />
                  {form.formState.errors.fullName && (
                    <p className="text-xs text-red-500 font-medium ms-1">{form.formState.errors.fullName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ms-1">Company</label>
                  <Input
                    {...form.register("companyName")}
                    placeholder="Acme Inc."
                    className="bg-slate-100/50 border-slate-200 focus:bg-white transition-all h-12"
                  />
                  {form.formState.errors.companyName && (
                    <p className="text-xs text-red-500 font-medium ms-1">{form.formState.errors.companyName.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ms-1">Email Address</label>
                <Input
                  {...form.register("email")}
                  placeholder="name@company.com"
                  type="email"
                  className="bg-slate-100/50 border-slate-200 focus:bg-white transition-all h-12"
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-red-500 font-medium ms-1">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ms-1">Password</label>
                <Input
                  {...form.register("password")}
                  placeholder="••••••••"
                  type="password"
                  className="bg-slate-100/50 border-slate-200 focus:bg-white transition-all h-12"
                />
                {form.formState.errors.password && (
                  <p className="text-xs text-red-500 font-medium ms-1">{form.formState.errors.password.message}</p>
                )}
              </div>

              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-100 text-red-600">
                  <AlertDescription className="text-xs font-medium">{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full h-12 bg-[#D81B12] hover:bg-[#9E0F09] text-white font-bold text-base shadow-lg shadow-red-200 mt-4" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pb-8">
            <p className="text-sm text-center text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-[#D81B12] hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
