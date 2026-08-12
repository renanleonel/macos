import {
  BIRTHDAY,
  BIRTHDAY_EVENT,
  DEFAULT_CALENDAR_EVENT,
} from '@/features/desktop/domain/constants/calendar-events';
import type { CalendarEvent } from '@/features/desktop/domain/models/calendar-event';

/** The birthday recurs every year, so only month and day are compared. */
export function isBirthday(date: Date) {
  return date.getMonth() === BIRTHDAY.month && date.getDate() === BIRTHDAY.day;
}

/** True while the calendar is showing the month the birthday falls in. */
export function isBirthdayMonth(date: Date) {
  return date.getMonth() === BIRTHDAY.month;
}

export function calendarEventForDate(date: Date): CalendarEvent {
  return isBirthday(date) ? BIRTHDAY_EVENT : DEFAULT_CALENDAR_EVENT;
}
