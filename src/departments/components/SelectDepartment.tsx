import { cn } from "@/shared/lib";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components";
import { Department } from "../interfaces/departments-response";

interface Props {
  departments: Department[];
  selectedDepartmentId?: string | null;
  onChange: (departmentId: string | null) => void;
  includeNoneOption?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const SelectDepartment = ({
  selectedDepartmentId,
  onChange,
  includeNoneOption = true,
  disabled = false,
  placeholder = "Seleccionar departamento",
  className,
  departments
}: Props) => {

  const handleChange = (selectedId: string) => {
    onChange(selectedId === "none" ? null : selectedId);
  };

  return (
    <Select
      value={selectedDepartmentId || "none"}
      onValueChange={handleChange}
      disabled={disabled}
    >
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {includeNoneOption && <SelectItem value="none">Sin asignar</SelectItem>}
        {departments.map((d) => (<SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>))}
      </SelectContent>
    </Select>
  );
};