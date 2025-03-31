import { ModalContentProps } from "@/interfaces";
import React from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

interface ModalProps {
  data: ModalContentProps;
  handleOpen(): void;
  height: number;
}

export function Modal({
  data: { description, title, type, action },
  handleOpen,
  height,
}: ModalProps) {
  return (
    <div
      style={{
        height,
      }}
      className="flex w-screen h-screen absolute top-0 z-10"
    >
      <div
        style={{
          height,
        }}
        onClick={() => {
          handleOpen();
        }}
        className="w-screen h-screen absolute top-0 bg-black opacity-50"
      />
      <Card className="flex flex-col w-4/6 h-4/6 m-auto justify-between  py-8 px-2 bg-gray-700 rounded-lg z-10">
        <CardHeader>
          <CardTitle className="mb-2">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {type === "success" ? (
          <CardFooter className="flex items-center justify-between">
            <button
              onClick={() => {
                handleOpen();
              }}
              className="p-2 px-4 text-red-500 border border-red-500 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                action();
                handleOpen();
              }}
              className="p-2 px-4 bg-emerald-600 rounded-md"
            >
              Confirmar
            </button>
          </CardFooter>
        ) : (
          <CardFooter>
            <button
              onClick={() => {
                action();
                handleOpen();
              }}
              className="p-2 px-4 w-full bg-red-700 rounded-md active:bg-red-800"
            >
              Tenho certeza
            </button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
