import { Api } from "@/api";
import React from "react";

export async function handleCheckLogin(login: string, password: string) {
  var response = await auth(login, password);
  console.log("Response do handlelogin", response);
  return response === 1 ? localStorage.setItem("IdLogin", "1") : localStorage;
}

const auth = async (login: string, password: string) => {
  try {
    const data = await Api.post("/auth", {
      data: {
        login: login,
        password: password,
      },
    });
    console.log(data);

    if (data.data == null) {
      console.log("nenhum usuario encontrado");
      return 0;
    } else {
      localStorage.setItem("IdLogin", "1");
      return 1;
    }
  } catch (error) {
    console.error(error);
  }
};
