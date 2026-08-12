import type { CalendarEvent } from '@/features/desktop/domain/models/calendar-event';

/** Recurring annual date, matched on month and day only. Month is 0-indexed. */
export const BIRTHDAY = { month: 7, day: 17 } as const;

export const BIRTHDAY_EVENT: CalendarEvent = {
  title: 'Birthday 🎂',
  detail: 'All day',
  isBirthday: true,
};

export const DEFAULT_CALENDAR_EVENT: CalendarEvent = {
  title: 'Study',
  detail: '10:00 AM',
  isBirthday: false,
};
