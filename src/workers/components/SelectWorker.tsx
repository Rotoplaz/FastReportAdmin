import { cn } from "@/shared/lib";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components";
import { Worker } from "@/workers/interfaces/worker.response";

interface Props {
  workers: Worker[];
  selectedWorker?: Worker | null;
  onChange: (worker: Worker | null) => void;
  includeNoneOption?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const SelectWorker = ({
  selectedWorker: selectedSupervisor,
  onChange,
  includeNoneOption = true,
  disabled = false,
  placeholder = "Seleccionar supervisor",
  className,
  workers
}: Props) => {


  const allAvailableSupervisors = [
    ...workers,
    ...(selectedSupervisor && !workers.some(s => s.id === selectedSupervisor.id)
      ? [selectedSupervisor]
      : [])
  ];


  const handleChange = (selectedId: string) => {
    if (selectedId === "none") {
      onChange(null);
    } else {
      const selectedWorker = allAvailableSupervisors.find((s) => s.id === selectedId);

      onChange(selectedWorker || null);
    }
  };


  return (
    <Select
      value={selectedSupervisor?.id || "none"}
      onValueChange={handleChange}
      disabled={disabled}
    >
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {includeNoneOption && (
          <SelectItem value="none">Sin asignar</SelectItem>
        )}

        {allAvailableSupervisors.map((s) => (
          <SelectItem key={s.id} value={s.id}>
            {s.firstName} {s.lastName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
