"use client";

import { useAppSelector } from "@/redux/store";
import React from "react";

export default function page() {
  const { currentUser } = useAppSelector((state) => state.user);

  console.log(currentUser);

  return <div>page</div>;
}
