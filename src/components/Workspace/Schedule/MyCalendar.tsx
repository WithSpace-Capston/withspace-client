import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";

let id = 0;

function MyCalendar() {
  const [events, setEvents] = useState<Array<EventApi>>([])
  const [initialEvents, setInitialEvents] = useState([
    {
      id: String(10001),
      title: "일정1",
      start: new Date().toISOString().split("T")[0],
    },
    {
      id: String(10002),
      title: "일정2",
      start: new Date().toISOString().split("T")[0] + "T14:05:00",
    },
  ]);
useEffect(()=>{console.log("event", events)}, [events])
  const handleEvents=(events:EventApi[]) => {
    setEvents(events)
  }
  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <>
        <b>Time Text: {eventInfo.timeText}</b>
        <b>Title: {eventInfo.event.title}</b>
      </>
    );
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    alert(`일정 이름: ${clickInfo.event.title}`);
    console.log(clickInfo.event.id);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt("event");
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect()
    if(title) {
      calendarApi.addEvent({
        id:String(id++),
        title,
        start:selectInfo.startStr,
        end: selectInfo.endStr,
        allDay:selectInfo.allDay
      })
    }
  };
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "dayGridMonth, timeGridWeek, timeGridDay",
          center: "title",
          right: "prev, next today",
        }}
        dateClick={(e: DateClickArg) => {
          console.log("dateclick", e);
        }}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        locale="en"
        initialView="dayGridMonth"
        selectable={true}
        eventsSet={handleEvents}
        editable={true}
        initialEvents={initialEvents}
        dayMaxEvents={false}
      />
    </>
  );
}

export default MyCalendar;
