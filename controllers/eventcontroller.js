const moment = require('moment');
const Event = require('../models/event');


function parseDate(dateStr) {
    const dateFormats = ['DD-MM-YYYY', 'DD/MM/YYYY'];

    if (!moment(dateStr, dateFormats, true).isValid()) {
        throw new Error('Invalid date format');
    }

    for (const format of dateFormats) {
        const parsedDate = moment(dateStr, format, true);
        if (parsedDate.isValid()) {
            return parsedDate.toDate();
        }
    }
    throw new Error('Invalid date format');
}

const createEvent = async (req, res) => {
    try {
        const { eventName, eventTitle, eventDescription, eventLocation, eventDate } = req.body;
        const images = req.files.map(file => file.filename);
        const newEvent = new Event({
            eventName,
            eventTitle,
            eventDescription,
            eventLocation,
            eventDate: parseDate(eventDate),
            images,
        });

        await newEvent.save();

        res.status(200).json({ message: 'Created the event successfully' });
    } catch (error) {
        if (error.message === 'Invalid date format') {
            return res.status(400).json({ error: 'Invalid date format' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { createEvent };
