import { BryntumCalendar } from '@bryntum/calendar-react';
import { calendarConfig } from './CalendarConfig';
import './App.scss';

function App() {
    return (
        <BryntumCalendar {...calendarConfig} />
    );
}

// If you plan to use stateful React collections for data binding please check this guide
// https://www.bryntum.com/docs/calendar/guide/Calendar/integration/react/data-binding

export default App;
