// RoleSelector.tsx
import { cn } from "@/shared/lib";
import { Role } from "@/workers/interfaces/worker.response";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components"; // Asume que se importan de aquí

interface Props {
  currentRole: Role;
  workerId: string;
  onChange: (workerId: string, newRole: Role) => void;
  disabled?: boolean;
  className?: string;
}

const roleOptions = [
  { value: Role.Supervisor, label: "Supervisor" },
  { value: Role.Worker, label: "Trabajador" },
];

export const RoleSelector = ({
  currentRole,
  workerId,
  onChange,
  disabled = false,
  className,
}: Props) => {

  const handleChange = (selectedRoleString: string) => {
    const newRole = selectedRoleString as Role;
    onChange(workerId, newRole);
  };

  return (
    <Select
      value={currentRole}
      onValueChange={handleChange}
      disabled={disabled}
    >
      <SelectTrigger className={cn("w-[140px]", className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {roleOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};