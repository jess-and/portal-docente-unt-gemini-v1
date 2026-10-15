import { differenceInCalendarDays, parseISO, format, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Calcula los días faltantes para la sustentación
 */
export const getDaysRemaining = (defenseDateStr) => {
  if (!defenseDateStr) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const defenseDate = parseISO(defenseDateStr);
  if (!isValid(defenseDate)) return 0;
  
  return differenceInCalendarDays(defenseDate, today);
};

/**
 * Lógica de Semaforización:
 * 🟢 Verde: Más de 30 días
 * 🟡 Amarillo: Entre 8 y 30 días
 * 🔴 Rojo: 7 días o menos
 */
export const getTrafficLightDetails = (days) => {
  if (days <= 7) {
    return {
      color: 'red',
      status: 'Urgente',
      label: `${days <= 0 ? '¡Hoy o Vencida!' : `¡Solo ${days} días!`}`,
      bgClass: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-300 dark:border-red-800',
      barClass: 'bg-red-600 dark:bg-red-500',
      textClass: 'text-red-600 dark:text-red-400',
      badgeDot: 'bg-red-500 animate-pulse',
      icon: 'AlertTriangle'
    };
  } else if (days <= 30) {
    return {
      color: 'yellow',
      status: 'Próximo',
      label: `${days} días restantes`,
      bgClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300 dark:border-amber-800',
      barClass: 'bg-amber-500 dark:bg-amber-400',
      textClass: 'text-amber-600 dark:text-amber-400',
      badgeDot: 'bg-amber-500',
      icon: 'Clock'
    };
  } else {
    return {
      color: 'green',
      status: 'En Plazo Normal',
      label: `${days} días restantes`,
      bgClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      barClass: 'bg-emerald-500 dark:bg-emerald-400',
      textClass: 'text-emerald-600 dark:text-emerald-400',
      badgeDot: 'bg-emerald-500',
      icon: 'CheckCircle2'
    };
  }
};

export const formatDateSpanish = (dateStr) => {
  if (!dateStr) return '';
  const date = parseISO(dateStr);
  if (!isValid(date)) return dateStr;
  return format(date, "d 'de' MMMM, yyyy", { locale: es });
};