"use client";
import React, { useState } from "react";

import NotStarted from "@/../public/not_started.svg";
import PauseCircle from "@/../public/pause_circle.svg";
import PlayCircle from "@/../public/play_circle.svg";
import StopCircle from "@/../public/stop_circle.svg";
import SaveClock from "@/../public/save_clock.svg";
import Image from "next/image";

interface ButtonProps {
  inProgress?: boolean;
  handleProgress(index?: number): void;
  className?: string;
  disabled: boolean;
  disabledActions: boolean;
}

export function Button({
  inProgress,
  handleProgress,
  className,
  disabled,
  disabledActions,
}: ButtonProps) {
  const [pressed, setPressed] = useState(-1);
  const [stillPressed, setStillPressed] = useState(false);

  const handleMouseDown = (index: number) => {
    if (index === 0 && !stillPressed) {
      setPressed(0);
    } else {
      setPressed(index);
    }
    document.addEventListener("mouseup", () => handleMouseUp(index), {
      once: true,
    });
  };

  const handleMouseUp = (index?: number) => {
    setPressed(-1);
    if (index === 0) {
      handleProgress();
      setStillPressed((old) => !old);
    } else {
      handleProgress(index);
      if (inProgress) {
        setStillPressed((old) => !old);
      }
    }
    document.removeEventListener("mouseup", () => handleMouseUp(index));
  };

  return (
    <div className={`flex w-full rounded-md ${className}`}>
      <div
        className={`flex flex-3/5 rounded-l-md bg-gray-400 ${
          stillPressed || pressed === 0 ? "pt-0.5 pl-0.5" : "pb-1"
        }`}
      >
        <button
          disabled={disabled}
          onMouseDown={() => handleMouseDown(0)}
          className={`flex flex-1 justify-center bg-purple-700 active:bg-purple-800 disabled:bg-purple-500 rounded-l-md ${
            !stillPressed && pressed !== 0 ? "shadow-md shadow-gray-700" : ""
          }`}
        >
          {inProgress ? (
            <Image
              draggable={false}
              width={36}
              alt="pause-circle"
              src={PauseCircle}
            />
          ) : inProgress === undefined ? (
            <Image
              draggable={false}
              width={36}
              alt="not-started"
              src={NotStarted}
            />
          ) : (
            <Image
              draggable={false}
              width={36}
              alt="play-circle"
              src={PlayCircle}
            />
          )}
        </button>
      </div>
      <div className="flex flex-col flex-2/5 border-2 border-t-0 border-r-0 border-b-0 border-yellow-500">
        <div
          className={`flex flex-1 rounded-tr-lg bg-gray-400${
            pressed === 1 ? " pl-px pt-px" : " pb-0.5"
          }`}
        >
          <button
            disabled={disabledActions}
            onMouseDown={() => handleMouseDown(1)}
            className={`flex flex-1 bg-red-600 active:bg-red-700 disabled:bg-red-950 rounded-tr-md py-2 ${
              pressed === 1 ? "" : "shadow-2xs shadow-gray-500"
            }`}
          >
            <Image
              draggable={false}
              className="m-auto"
              alt="stop-circle"
              src={StopCircle}
            />
          </button>
        </div>
        <div
          className={`flex flex-1 rounded-br-md bg-gray-400 ${
            pressed === 2 ? "pl-px pt-px" : "pb-0.5"
          }`}
        >
          <button
            onMouseDown={() => handleMouseDown(2)}
            disabled={disabledActions}
            className={`flex flex-1 bg-emerald-600 active:bg-emerald-700 disabled:bg-emerald-950 rounded-br-lg py-2 ${
              pressed === 2 ? "" : "shadow-2xs shadow-gray-500"
            }`}
          >
            <Image
              draggable={false}
              className="m-auto"
              alt="save-clock"
              src={SaveClock}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
