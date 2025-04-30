export function RecentReports() {
    return (
      <div className="space-y-8">
        <div className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Departamento de Recursos Humanos</p>
            <p className="text-sm text-muted-foreground">
              Solicitud de actualización de políticas
            </p>
          </div>
          <div className="ml-auto flex flex-col items-end">
            <span className="font-medium text-amber-600">Pendiente</span>
            <span className="text-xs text-muted-foreground">2024-01-15</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Área de Mantenimiento</p>
            <p className="text-sm text-muted-foreground">Reparación de equipo técnico</p>
          </div>
          <div className="ml-auto flex flex-col items-end">
            <span className="font-medium text-green-600">Resuelto</span>
            <span className="text-xs text-muted-foreground">2024-01-14</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Departamento de TI</p>
            <p className="text-sm text-muted-foreground">
              Actualización de software
            </p>
          </div>
          <div className="ml-auto flex flex-col items-end">
            <span className="font-medium text-blue-600">En Proceso</span>
            <span className="text-xs text-muted-foreground">2024-01-13</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Área de Logística</p>
            <p className="text-sm text-muted-foreground">Gestión de inventario</p>
          </div>
          <div className="ml-auto flex flex-col items-end">
            <span className="font-medium text-red-600">Urgente</span>
            <span className="text-xs text-muted-foreground">2024-01-12</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Departamento Legal</p>
            <p className="text-sm text-muted-foreground">Revisión de contratos</p>
          </div>
          <div className="ml-auto flex flex-col items-end">
            <span className="font-medium text-green-600">Resuelto</span>
            <span className="text-xs text-muted-foreground">2024-01-11</span>
          </div>
        </div>
      </div>
    );
  }