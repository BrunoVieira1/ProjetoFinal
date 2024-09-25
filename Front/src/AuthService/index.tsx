import { Api } from "@/api";
import React from "react";

export async function handleCheckLogin(login: string, password: string) {
  var response = await auth(login, password);
  console.log("Response do handlelogin", response);
  return response != 0
    ? (localStorage.setItem("IdLogin", response), (window.location.href = "/"))
    : (localStorage.setItem("IdLogin", "0"), (window.location.href = "/"));
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
      localStorage.setItem("IdLogin", data.data.users.id);
      return data.data.users.id;
    }
  } catch (error) {
    console.error(error);
  }
};
