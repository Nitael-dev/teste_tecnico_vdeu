import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { TrackingProps } from "@/interfaces";

interface TrackingCardProps {
  data: TrackingProps;
}

export function TrackingCard({
  data: { time, timeType, createdAt },
}: TrackingCardProps) {
  return (
    <Card className="flex w-full py-2 gap-4 my-2">
      <CardHeader className="flex items-center justify-between px-4">
        <CardTitle>{timeType}</CardTitle>
        <CardDescription>{createdAt}</CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <CardAction>{time}</CardAction>
      </CardContent>
    </Card>
  );
}
