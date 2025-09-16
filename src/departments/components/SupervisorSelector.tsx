import { cn } from "@/shared/lib";
import { UnassignedWorker } from "@/workers/actions/get-unassigned-workers";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components";

interface Props {
  supervisors: UnassignedWorker[];
  selectedSupervisor?: UnassignedWorker | null;
  onChange: (worker: UnassignedWorker | null) => void;
  includeNoneOption?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const SupervisorComboBox = ({
  selectedSupervisor,
  onChange,
  includeNoneOption = true,
  disabled = false,
  placeholder = "Seleccionar supervisor",
  className,
  supervisors
}: Props) => {
  const handleChange = (selectedId: string) => {
    if (selectedId === "none") {
      onChange(null);
    } else {
      const selectedWorker =
        supervisors.find((s) => s.id === selectedId) ||
        (selectedSupervisor?.id === selectedId ? selectedSupervisor : null);
      onChange(selectedWorker);
    }
  };

  const filteredSupervisors = supervisors.filter(
    (s) => s.id !== selectedSupervisor?.id
  );

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

        {selectedSupervisor && (
          <SelectItem value={selectedSupervisor.id}>
            {selectedSupervisor.firstName} {selectedSupervisor.lastName}
          </SelectItem>
        )}

        {filteredSupervisors.map((s) => (
          <SelectItem key={s.id} value={s.id}>
            {s.firstName} {s.lastName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
