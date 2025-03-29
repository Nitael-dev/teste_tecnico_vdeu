import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToggleGroupItem } from "@/components/ui/toggle-group";

interface TooltipProps {
  value: string;
  onClick?(): void;
  className?: string;
  selected?: boolean;
  tip?: string;
}

export function TooltipValue({ value, selected, tip, ...props }: TooltipProps) {
  return tip !== undefined ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-wrap">{value}</span>
        </TooltipTrigger>
        <TooltipContent sideOffset={-2}>
          <p>{tip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <ToggleGroupItem value={value} {...props}>
      <label className={`text-wrap ${selected ? "text-purple-700" : ""}`}>
        {value}
      </label>
    </ToggleGroupItem>
  );
}
