
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cva } from 'class-variance-authority';
import { Report } from '@/reports/interfaces/reports.interfaces';
import { Badge } from '../ui/badge';


const statusVariants = cva("font-medium", {
  variants: {
    status: {
      pending: "text-amber-600 dark:text-amber-400",
      in_progress: "text-blue-600 dark:text-blue-400",
      completed: "text-green-600 dark:text-green-400",
      cancelled: "text-gray-600 dark:text-gray-400"
    },
    priority: {
      high: "font-bold",
      medium: "font-semibold",
      low: ""
    }
  },
  defaultVariants: {
    priority: "low"
  }
});


const priorityBadgeVariants = cva("text-xs font-medium", {
  variants: {
    priority: {
      high: "text-red-600 dark:text-red-400",
      medium: "text-amber-600 dark:text-amber-400",
      low: "text-gray-600 dark:text-gray-400"
    }
  },
  defaultVariants: {
    priority: "low"
  }
});

interface Props {
  report: Report;
  className?: string;
  onClick?: (report: Report) => void;
}

export const RecentReport= ({ 
  report, 
  className = '',
  onClick 
}:Props) => {
  const statusText = {
    pending: 'Pendiente',
    in_progress: 'En Proceso',
    completed: 'Resuelto',
    cancelled: 'Cancelado'
  };

  const priorityText = {
    high: 'Urgente',
    medium: 'Importante',
    low: 'Normal'
  };

  const formattedDate = format(new Date(report.createdAt), 'yyyy-MM-dd', { locale: es });

  const handleClick = () => {
    onClick?.(report);
  };

  return (
    <div 
      className={`flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className="space-y-1 flex-1 min-w-0">
        <p className="text-sm font-medium leading-none truncate dark:text-white">
          {report.category?.name || 'Sin categoría'}
        </p>
        <p className="text-sm text-muted-foreground dark:text-gray-400 truncate">
          {report.title}
        </p>
      </div>
      <div className="ml-auto flex flex-col items-end flex-shrink-0">
        <div className="flex items-center gap-1">
          {report.priority === 'high' && (
              <Badge
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                variant="destructive"
              >
                {priorityText[report.priority]}
              </Badge>

          )}
          <span className={statusVariants({ 
            status: report.status, 
            priority: report.priority 
          })}>
            {statusText[report.status]}
          </span>

        </div>
        <span className="text-xs text-muted-foreground dark:text-gray-500">
          {formattedDate}
        </span>
      </div>
    </div>
  );
};