import React from "react";
import { Card } from "@/components/ui/card";

interface ChronometerProps {
  time: string;
}

export function Chronometer({ time }: ChronometerProps) {
  return (
    <>
      <Card className="flex px-8 bg-cyan-600">
        <time className="text-3xl">{time}</time>
      </Card>
    </>
  );
}
