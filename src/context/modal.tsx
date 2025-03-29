"use client";
import { Modal } from "@/components/modal";
import { ModalContentProps } from "@/interfaces";
import { createContext, useContext, useState } from "react";

interface ModalContextProps {
  contentHandler(data: ModalContentProps): void;
}

interface ModalContextProviderProps {
  children: React.ReactNode;
}

const DEFAULT_MODAL: ModalContentProps = {
  title: "",
  description: "",
  type: "success",
  action: () => {},
};

const ModalContext = createContext({} as ModalContextProps);

export function ModalContextProvider({ children }: ModalContextProviderProps) {
  const [data, setData] = useState(DEFAULT_MODAL);
  const [state, setState] = useState(false);

  function contentHandler(content: ModalContentProps) {
    setData(content);
    handleOpen();
  }

  function handleOpen() {
    setState((old) => !old);
  }

  return (
    <ModalContext
      value={{
        contentHandler,
      }}
    >
      {state && <Modal handleOpen={handleOpen} open={state} data={data} />}
      {children}
    </ModalContext>
  );
}

export const useModal = () => useContext(ModalContext);
