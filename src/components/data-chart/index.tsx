"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LeaderboardProps } from "@/interfaces";
import { useEffect } from "react";

const chartConfig = {
  disciplines: {
    label: "Disciplinas",
    color: "#8200db",
  },
  themes: {
    label: "Temas",
    color: "#8200db",
  },
} satisfies ChartConfig;

interface DataChartProps {
  data: LeaderboardProps[];
}

export function DataChart({ data }: DataChartProps) {
  function _chartData() {
    const disciplinesDescription: { [x in string]: string | number } = {
      description: "Disciplinas",
    };
    const themesDescription: { [x in string]: string | number } = {
      description: "Temas",
    };

    const themes = data
      .filter(
        ({ tema }, key, arr) => arr.findIndex((e) => e.tema === tema) === key
      )
      .map(({ tema, value, id }) => {
        data.forEach((e) => {
          if (e.tema === tema && e.id !== id) {
            return (value += e.value);
          }
        });
        return {
          [tema]: value,
        };
      });

    const disciplines = data
      .filter(
        ({ disciplina }, key, arr) =>
          arr.findIndex((e) => e.disciplina === disciplina) === key
      )
      .map(({ disciplina, value, id }) => {
        data.forEach((e) => {
          if (e.disciplina === disciplina && e.id !== id) {
            return (value += e.value);
          }
        });
        return {
          [disciplina]: value,
        };
      });

    themes.forEach((tema) => {
      const newTheme = Object.keys(tema);
      const newValue = Object.values(tema);
      const totalSeconds = Math.floor(newValue[0] / 1000);
      themesDescription[newTheme[0]] = totalSeconds;
    });

    disciplines.forEach((tema) => {
      const newDiscipline = Object.keys(tema);
      const newValue = Object.values(tema);
      const totalSeconds = Math.floor(newValue[0] / 1000);
      disciplinesDescription[newDiscipline[0]] = totalSeconds;
    });

    return [disciplinesDescription, themesDescription];
  }

  useEffect(() => {
    _chartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={_chartData()}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="description"
          tickLine={false}
          tickMargin={2}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <ChartTooltip
          position={{
            x: 64,
            y: -92,
          }}
          content={<ChartTooltipContent />}
        />
        {Object.entries(_chartData()[0])
          .filter((e) => e[0] !== "description")
          .map((e, key) => {
            return (
              <Bar
                key={`chart-discipline-${key}`}
                dataKey={e[0]}
                fill="var(--color-disciplines)"
                radius={4}
              />
            );
          })}
        {Object.entries(_chartData()[1])
          .filter((e) => e[0] !== "description")
          .map((e, key) => {
            return (
              <Bar
                key={`chart-theme-${key}`}
                dataKey={e[0]}
                fill="var(--color-themes)"
                radius={4}
              />
            );
          })}
      </BarChart>
    </ChartContainer>
  );
}
