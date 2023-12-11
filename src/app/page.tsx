"use client";

import { Api } from "@/api/configs";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const getData = async () => {
      const { data } = await Api.user.getListUsers(1, 10);

      console.log("data", data);
    };
    getData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
