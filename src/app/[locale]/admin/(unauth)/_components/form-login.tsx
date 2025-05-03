"use client";

import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addToast } from "@heroui/toast";

import { useLogin } from "@/hooks/use-login";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { mutateAsync, isPending } = useLogin();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await mutateAsync({ email, password });

      router.push("/admin/dashboard");
    } catch (err: any) {
      addToast({
        title: "Login Failed",
        description: err.message || "Login gagal",
        color: "danger",
      });
    }
  };

  return (
    <Card className="w-full max-w-md p-6 bg-transparent" shadow="none">
      <CardHeader className="text-center text-2xl font-bold flex justify-center">
        Welcome, Admin
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <Input
            required
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
            type="email"
            value={email}
            variant="bordered"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            required
            label="Password"
            labelPlacement="outside"
            placeholder="Enter your password"
            type="password"
            value={password}
            variant="bordered"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="w-full  text-white font-bold py-2 px-4 rounded-md"
            isLoading={isPending}
            type="submit"
          >
            Login
          </Button>
        </form>
      </CardBody>
      <CardFooter className="text-center text-sm text-gray-400 flex flex-col gap-2">
        <p> &copy; 2024 Admin Portal.</p>
        <p> All rights reserved.</p>
      </CardFooter>
    </Card>
  );
}
