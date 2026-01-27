/**
 * Calendar utilities for creating calendar events
 */

interface CalendarEvent {
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
}

/**
 * Generates an .ics file content for calendar events
 */
function generateICS(event: CalendarEvent): string {
  const formatDate = (date: Date): string => {
    return date
      .toISOString()
      .replace(/[-:]/g, '')
      .split('.')[0] + 'Z';
  };

  const endDate = event.endDate || new Date(event.startDate.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Fellowship Church//Event//EN',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(event.startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${event.title}`,
    event.description ? `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}` : '',
    event.location ? `LOCATION:${event.location}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n');
}

/**
 * Downloads an .ics file for the event
 */
export function downloadICSFile(event: CalendarEvent): void {
  const icsContent = generateICS(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

/**
 * Opens Google Calendar with pre-filled event data
 */
export function addToGoogleCalendar(event: CalendarEvent): void {
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const endDate = event.endDate || new Date(event.startDate.getTime() + 2 * 60 * 60 * 1000);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatDate(event.startDate)}/${formatDate(endDate)}`,
    details: event.description || '',
    location: event.location || '',
  });

  window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
}

/**
 * Shows a menu to choose calendar provider
 */
export function addToCalendar(event: CalendarEvent): void {
  // For now, we'll use Google Calendar as default
  // In the future, this could show a modal to choose between Google, Outlook, iCal, etc.
  const userChoice = confirm(
    'Add to Google Calendar?\n\nClick OK for Google Calendar, or Cancel to download .ics file for other calendars.'
  );

  if (userChoice) {
    addToGoogleCalendar(event);
  } else {
    downloadICSFile(event);
  }
}
