import { handleCheckLogin } from "@/AuthService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

function Login() {
  localStorage.setItem("IdLogin", "0");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const login = data.get("login") as string;
    const password = data.get("password") as string;
    handleCheckLogin(login, password);
    console.log({ login: data.get("login"), password: data.get("password") });
  };
  return (
    <div className="flex flex-1 justify-between h-screen">
      <div className="w-full h-screen bg-[url('./assets/bar.jpg')] bg-cover">
        x
      </div>
      <form
        className="flex flex-col h-screen w-[640px] bg-yellow-500 p-20 gap-12"
        onSubmit={handleSubmit}
      >
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-4">
          PUB
        </h1>
        <div>
          <Label>Login</Label>
          <Input className="bg-white bg-opacity-15" name="login" />
        </div>
        <div>
          <Label>Senha</Label>
          <Input
            className="bg-white bg-opacity-15"
            name="password"
            type="password"
          />
        </div>
        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
}

export default Login;
