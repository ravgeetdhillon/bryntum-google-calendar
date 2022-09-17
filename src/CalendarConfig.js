/**
 * Application configuration
 */

const calendarConfig = {
    date : new Date(2022, 2, 15),

    crudManager : {
        transport : {
            load : {
                url : 'data/calendar-data.json'
            }
        },
        autoLoad : true
    }
};

export { calendarConfig };
