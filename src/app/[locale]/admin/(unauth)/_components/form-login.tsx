"use client";

import { useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "@/hooks/use-login";
import { showToast } from "@/utils/show-toast";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email wajib diisi")
    .email("Email tidak valid"),
  password: z.string().trim().min(1, "Password wajib diisi"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export default function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useLogin();

  const router = useRouter();

  const onSubmit = (data: LoginFormData) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/admin/dashboard");
      },
      onError: (err: any) => {
        showToast({
          type: "danger",
          title: "Login",
          description: err.message || "Login gagal",
        });
      },
    });
  };

  return (
    <Card className="w-full max-w-md p-6 bg-transparent" shadow="none">
      <CardHeader className="text-center text-2xl font-bold flex justify-center text-white">
        Welcome, Admin
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email", { required: "Email wajib diisi" })}
            classNames={{
              inputWrapper: "bg-transparent",
              input: "text-white placeholder:text-gray-400",
              label: "text-white",
            }}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />

          <Input
            {...register("password", { required: "Password wajib diisi" })}
            classNames={{
              inputWrapper: "bg-transparent",
              input: "text-white placeholder:text-gray-400",
              label: "text-white",
            }}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            label="Password"
            labelPlacement="outside"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
          />

          <Button
            className="w-full text-white font-bold py-2 px-4 rounded-md"
            isLoading={isPending}
            type="submit"
          >
            Login
          </Button>
        </form>
      </CardBody>
      <CardFooter className="text-center text-sm text-gray-400 flex flex-col gap-2">
        <p>&copy; 2024 Admin Portal.</p>
        <p>All rights reserved.</p>
      </CardFooter>
    </Card>
  );
}
