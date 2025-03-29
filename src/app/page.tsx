"use client";

import { Button } from "@/components/button";
import { Chronometer } from "@/components/chronometer";
import { Databoard } from "@/components/databoard";
import { TooltipValue } from "@/components/toggle";
import { TrackingCard } from "@/components/tracking-card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { useModal } from "@/context/modal";
import { LeaderboardProps, TrackingProps } from "@/interfaces";
// import { ToggleProps } from "@/interfaces";
import { material } from "@/mock";
import { formatTime, formatTimestamp } from "@/utils";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const { contentHandler } = useModal();

  const [discipline, setDiscipline] = useState("");
  const [theme, setTheme] = useState("");

  const [progressing, setProgressing] = useState<boolean | undefined>();

  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const [currentTracking, setCurrentTracking] = useState<TrackingProps[]>([]);

  const [board, setBoard] = useState<LeaderboardProps[]>([]);

  function renderDisciplines(): React.ReactNode {
    return material
      .filter(
        ({ disciplina }, key, arr) =>
          arr.findIndex((e) => e.disciplina === disciplina) === key
      )
      .map(({ disciplina }, key) => (
        <TooltipValue
          key={key}
          value={disciplina}
          selected={disciplina === discipline}
          className="my-1"
          onClick={() => {
            setDiscipline(disciplina);
            setTheme("");
          }}
        />
      ));
  }

  function renderThemes(): React.ReactNode {
    return material
      .filter(({ disciplina }) => disciplina === discipline)
      .map(({ tema }, key) => (
        <TooltipValue
          key={key}
          selected={tema === theme}
          value={tema}
          className="my-1"
          onClick={() => setTheme(tema)}
        />
      ));
  }

  const handleTimers = useCallback(
    (index?: number) => {
      if (!discipline || !theme) {
        return;
      }
      switch (index) {
        case 1:
          contentHandler({
            title: "Você está prestes a perder um progresso importante!",
            type: "confirmation",
            description:
              "Todo o progresso feito na plataforma é rastreado e somado ao tempo total investido em cada disciplina e tema da plataforma! Tem certeza que deseja perder todo o progresso rastreado até então?",
            action: () => {
              localStorage.setItem(
                "@vdue:lastTracked",
                JSON.stringify([
                  ...currentTracking,
                  {
                    id: currentTracking.length - 1,
                    time: formatTime(elapsedTime),
                    total: elapsedTime,
                    timeType: "Finalizado",
                    createdAt: formatTimestamp(new Date()),
                  },
                ])
              );

              setElapsedTime(0);
              setStartTime(null);

              setProgressing(undefined);
              setCurrentTracking([]);
            },
          });
          break;
        case 2:
          contentHandler({
            title: "Gostaria de salvar seu progresso atual?",
            type: "success",
            description:
              "Ao clicar em confirmar, todas as interações serão salvas e contribuirão para a contagem de horas investidas em cada disciplina/tema.",
            action: () => {
              localStorage.setItem(
                "@vdue:tracking",
                JSON.stringify([
                  ...board,
                  {
                    id: board.length,
                    tema: theme,
                    disciplina: discipline,
                    value: elapsedTime,
                  },
                ])
              );
              localStorage.setItem(
                "@vdue:lastTracked",
                JSON.stringify([
                  ...currentTracking,
                  {
                    id: currentTracking.length - 1,
                    time: formatTime(elapsedTime),
                    total: elapsedTime,
                    timeType: "Finalizado",
                    createdAt: formatTimestamp(new Date()),
                  },
                ])
              );

              setElapsedTime(0);
              setStartTime(null);

              setProgressing(undefined);
              // setCurrentTracking([]);
            },
          });

          break;
        default:
          const actualDate = new Date();
          setProgressing((old) => (old !== undefined ? !old : true));
          if (!progressing) {
            const now = Date.now();
            setStartTime(now - elapsedTime);
            if (elapsedTime === 0) {
              setCurrentTracking([
                {
                  id: 0,
                  time: formatTime(elapsedTime),
                  timeType: "Início",
                  total: elapsedTime,
                  createdAt: formatTimestamp(actualDate),
                },
              ]);
            } else {
              setCurrentTracking((old) =>
                old.concat({
                  id: old.length - 1,
                  time: formatTime(elapsedTime),
                  total: elapsedTime,
                  timeType: "Retomado",
                  createdAt: formatTimestamp(actualDate),
                })
              );
            }
          }
          break;
      }
    },
    [
      board,
      contentHandler,
      currentTracking,
      discipline,
      elapsedTime,
      progressing,
      theme,
    ]
  );

  async function handleLocalData() {
    const tracking = JSON.parse(
      String(await localStorage.getItem("@vdue:tracking"))
    );
    const lastTracked =
      JSON.parse(String(await localStorage.getItem("@vdue:lastTracked"))) ?? [];
    setCurrentTracking(lastTracked);
    console.log("tracking", tracking);
    setBoard(tracking ?? []);
  }

  useEffect(() => {
    let animationFrame: number;

    const updateTimer = () => {
      if (progressing) {
        setElapsedTime(Date.now() - startTime!);
        animationFrame = requestAnimationFrame(updateTimer);
      }
    };

    if (progressing) {
      animationFrame = requestAnimationFrame(updateTimer);
    } else if (progressing !== undefined) {
      setCurrentTracking((old) =>
        old.concat({
          id: old.length - 1,
          time: formatTime(elapsedTime),
          total: elapsedTime,
          timeType: "Pausado",
          createdAt: formatTimestamp(new Date()),
        })
      );
    }

    return () => cancelAnimationFrame(animationFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressing, startTime]);

  useEffect(() => {
    if (startTime === null) {
      handleLocalData();
    }
  }, [startTime]);

  return (
    <div className="flex w-screen h-screen py-12 flex-col items-center justify-between">
      <div className="flex flex-1 gap-2 pl-4 pr-0 justify-center items-start w-full">
        <div className="flex w-3/12">
          <Databoard data={board} />
        </div>
        <div className="flex flex-col h-full justify-between items-center w-6/12">
          <div className="flex gap-2 justify-between ">
            {progressing === undefined && (
              <div className="flex flex-col">
                <Label className="ml-1 my-2" htmlFor="input-1">
                  Pesquisa de disciplinas
                </Label>
                <ScrollArea className={`px-4 h-fit rounded-md border`}>
                  <ToggleGroup
                    className="flex flex-col mx-auto py-2"
                    type="single"
                  >
                    {renderDisciplines()}
                  </ToggleGroup>
                </ScrollArea>
              </div>
            )}

            {progressing === undefined && (
              <div className="flex flex-col">
                <Label className="ml-1 my-2" htmlFor="input-2">
                  Pesquisa de temas
                </Label>
                <ScrollArea
                  className={`px-4${
                    !discipline ? " h-0 " : " h-fit "
                  }rounded-md border`}
                >
                  <ToggleGroup
                    className="flex flex-col mx-auto py-2"
                    type="single"
                  >
                    {renderThemes()}
                  </ToggleGroup>
                </ScrollArea>
              </div>
            )}
          </div>

          <div
            className={`flex flex-col h-full justify-evenly items-center transition-all ${
              discipline ? " w-6/12" : " w-0"
            }`}
          >
            <div
              className={`flex flex-col gap-2 items-center text-center bg-purple-400 rounded-md p-4 px-6`}
            >
              <article className="font-semibold">{discipline}</article>
              <div className="h-px w-full bg-gray-950" />
              <article className="font-semibold">
                <TooltipValue
                  tip={
                    material.find(({ tema }) => tema === theme)?.pilares ?? ""
                  }
                  value={theme}
                />
              </article>
            </div>
            {progressing !== undefined && (
              <Chronometer time={formatTime(elapsedTime)} />
            )}

            <Button
              disabled={!discipline || !theme}
              disabledActions={!discipline || !theme || startTime === null}
              inProgress={progressing}
              handleProgress={handleTimers}
            />
          </div>
        </div>
        {currentTracking.length > 0 && (
          <div className="flex flex-col items-center w-3/12">
            <ScrollArea className="w-full h-96 pr-4">
              {currentTracking.map((item, key) => (
                <TrackingCard data={item} key={`currentTracking-card-${key}`} />
              ))}
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
