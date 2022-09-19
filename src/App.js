import { useEffect, useState } from "react";
import { BryntumCalendar } from "@bryntum/calendar-react";
import { gapi } from "gapi-script";
import "./App.scss";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const calendarID = process.env.REACT_APP_CALENDAR_ID;

const calendarConfig = {
  date: new Date(),
};

export default function App() {
  const [events, setEvents] = useState([]);

  const getEvents = () => {
    function initiate() {
      gapi.client
        .init({
          apiKey: apiKey,
        })
        .then(function () {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
              calendarID
            )}/events`,
          });
        })
        .then(
          (response) => {
            let events = response.result.items;
            setEvents(
              events.map((event) => ({
                id: event.id,
                name: event.summary,
                startDate: event.start.date,
                endDate: event.end.date,
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

  useEffect(() => {
    getEvents();
  }, []);

  return <BryntumCalendar events={events} {...calendarConfig} />;
}
