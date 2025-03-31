import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LeaderboardProps } from "@/interfaces";
import { formatTime } from "@/utils";
import { ScrollArea } from "../ui/scroll-area";

interface DataboardProps {
  data: LeaderboardProps[];
}

export function Databoard({ data }: DataboardProps) {
  function assemble() {
    return data
      .filter(
        ({ tema }, key, arr) => arr.findIndex((e) => e.tema === tema) === key
      )
      .map(({ tema, disciplina, value, id }) => {
        data.forEach((e) => {
          if (e.tema === tema && e.id !== id) {
            return (value += e.value);
          }
        });
        return {
          tema,
          disciplina,
          value,
          id,
        };
      })
      .toSorted((a, b) => b.value - a.value);
  }

  return (
    <Card className="flex flex-col items-center justify-center w-full">
      <CardHeader className="flex w-full">
        <CardTitle>Tabela dos mais estudados!</CardTitle>
      </CardHeader>
      <ScrollArea className="flex w-full h-32">
        {assemble().map(({ tema, disciplina, value }, key) => {
          return (
            <CardContent className="flex flex-col" key={`board-row-${key}`}>
              <CardAction>
                {disciplina} | {tema}
              </CardAction>
              <CardDescription>
                {formatTime(Number(new Date(value)))}
              </CardDescription>
            </CardContent>
          );
        })}
      </ScrollArea>
    </Card>
  );
}
