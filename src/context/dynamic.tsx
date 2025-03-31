"use client";

import { ModalContextProviderProps } from "@/interfaces";
import dynamic from "next/dynamic";

const DynamicModalContextProvider = dynamic(() => import("@/context/modal"), {
  ssr: false,
});

export function ModalContextProvider({ children }: ModalContextProviderProps) {
  return <DynamicModalContextProvider>{children}</DynamicModalContextProvider>;
}
