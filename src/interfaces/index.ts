export interface MaterialProps {
  disciplina: string;
  tema: string;
  tempoEstudado: number;
  pilares: string;
}

export interface ToggleProps {
  value: string;
  label: string;
  time: number;
}

export interface TrackingProps {
  id: number;
  time: string;
  total: number;
  timeType: string;
  createdAt: string;
}

export interface ModalContentProps {
  title?: string;
  description?: string;
  type?: "confirmation" | "success";
  action(): void;
}

export interface LeaderboardProps {
  id: number;
  tema: string;
  disciplina: string;
  value: number;
}

export interface ModalContextProviderProps {
  children: React.ReactNode;
}
