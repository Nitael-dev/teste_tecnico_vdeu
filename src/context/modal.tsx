"use client";
import { Modal } from "@/components/modal";
import { ModalContentProps, ModalContextProviderProps } from "@/interfaces";
import { createContext, useContext, useLayoutEffect, useState } from "react";

interface ModalContextProps {
  contentHandler(data: ModalContentProps): void;
}

const DEFAULT_MODAL: ModalContentProps = {
  title: "",
  description: "",
  type: "success",
  action: () => {},
};

const ModalContext = createContext({} as ModalContextProps);

export default function NonDynamicModalProvider({
  children,
}: ModalContextProviderProps) {
  const [data, setData] = useState(DEFAULT_MODAL);
  const [state, setState] = useState(false);

  const [modalHeight, setModalHeight] = useState(0);

  function contentHandler(content: ModalContentProps) {
    setData(content);
    handleOpen();
  }

  function handleOpen() {
    setState((old) => !old);
  }

  useLayoutEffect(() => {
    setModalHeight(document?.body?.scrollHeight ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document?.body?.scrollHeight]);

  return (
    <ModalContext
      value={{
        contentHandler,
      }}
    >
      {state && (
        <Modal height={modalHeight} handleOpen={handleOpen} data={data} />
      )}
      {children}
    </ModalContext>
  );
}

export const useModal = () => useContext(ModalContext);
