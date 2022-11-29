import { useEffect, useState } from "react";
import { BryntumCalendar } from "@bryntum/calendar-react";
import { gapi } from "gapi-script";
import "./App.scss";

const accessToken = process.env.REACT_APP_CREDENTIALS_ACCESS_TOKEN;
const calendarID = process.env.REACT_APP_CALENDAR_ID;

export default function App() {
  const [events, setEvents] = useState([]);

  const getEvents = () => {
    function initiate() {
      gapi.client
        .request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
            calendarID
          )}/events`,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(
          (response) => {
            let events = response.result.items;
            setEvents(
              events.map((event) => ({
                id: event.id,
                name: event.summary,
                startDate: event.start?.dateTime,
                endDate: event.end?.dateTime,
              }))
            );
          },
          function (err) {
            console.error(err.body);
          }
        );
    }
    gapi.load("client", initiate);
  };

  const addEvent = (event) => {
    function initiate() {
      gapi.client
        .request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
            calendarID
          )}/events`,
          method: "POST",
          body: event,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(
          (response) => {
            return response;
          },
          function (err) {
            console.error(err);
          }
        );
    }
    gapi.load("client", initiate);
  };

  const editEvent = (eventId, event) => {
    function initiate() {
      gapi.client
        .request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
            calendarID
          )}/events/${eventId}`,
          method: "PATCH",
          body: event,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(
          (response) => {
            return response;
          },
          function (err) {
            console.error(err);
          }
        );
    }
    gapi.load("client", initiate);
  };

  const handleEventUpdate = ({ eventRecord, type }) => {
    const event = {
      summary: eventRecord.data.name,
      location: "",
      start: {
        dateTime: eventRecord.data.startDate,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: eventRecord.data.endDate,
        timeZone: "Asia/Kolkata",
      },
    };

    switch (type) {
      case "dragresizeend":
        editEvent(eventRecord.data.realEventId, event);
        break;
      case "aftereventsave":
        if (eventRecord.data.id.includes("_generatedc_")) {
          addEvent(event);
        } else {
          editEvent(eventRecord.data.id, event);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <BryntumCalendar
      events={events}
      date={new Date()}
      draggable
      onAfterEventSave={handleEventUpdate}
      onDragResizeEnd={handleEventUpdate}
    />
  );
}
