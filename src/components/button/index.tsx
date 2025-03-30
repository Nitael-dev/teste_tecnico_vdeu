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
      <button
        disabled={disabled}
        onMouseDown={() => handleMouseDown(0)}
        className={`flex flex-3/5 justify-center bg-purple-700 active:bg-purple-800 disabled:bg-purple-500 rounded-l-md ${
          stillPressed
            ? " border-2 border-b-0 border-r-0 "
            : " border-4 border-t-0 border-l-0 border-r-0"
        } border-gray-400`}
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
      <div className="flex flex-col flex-2/5 border-2 border-t-0 border-r-0 border-b-0 border-yellow-500">
        <button
          disabled={disabledActions}
          onMouseDown={() => handleMouseDown(1)}
          className={`bg-red-600 active:bg-red-500 disabled:bg-red-800 rounded-tr-md py-2 ${
            pressed === 1
              ? " border-2 border-b-0 border-r-0"
              : " border-2 border-t-0 border-l-0 border-r-0"
          } border-gray-400`}
        >
          <Image
            draggable={false}
            className="m-auto"
            alt="stop-circle"
            src={StopCircle}
          />
        </button>
        <button
          onMouseDown={() => handleMouseDown(2)}
          disabled={disabledActions}
          className={`bg-emerald-600 active:bg-emerald-500 disabled:bg-emerald-800 rounded-br-md py-2 ${
            pressed === 2
              ? " border-2 border-b-0 border-r-0"
              : " border-2 border-t-0 border-l-0 border-r-0"
          } border-gray-400`}
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
  );
}
