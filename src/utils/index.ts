export function formatTimestamp(date: Date) {
  return `${
    String(date.getHours()).length === 1
      ? "0" + String(date.getHours())
      : date.getHours()
  }:${
    String(date.getMinutes()).length === 1
      ? "0" + String(date.getMinutes())
      : date.getMinutes()
  }:${
    String(date.getSeconds()).length === 1
      ? "0" + String(date.getSeconds())
      : date.getSeconds()
  } | ${
    String(date.getDate()).length === 1
      ? "0" + String(date.getDate())
      : date.getDate()
  }/${
    String(date.getMonth() + 1).length === 1
      ? "0" + String(date.getMonth() + 1)
      : date.getMonth() + 1
  }`;
}

export const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
    .toString()
    .padStart(2, "0")}`;
};
