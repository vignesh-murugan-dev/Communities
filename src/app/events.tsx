import React from 'react';
import events from '../data/events.json'

const Events = () => {
    return (
        <main className="px-4 md:px-8 lg:px-16 rounded-xl bg-white py-8">
            <section>
                <h2 className="text-xl font-semibold text-black mb-4">/events:april</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {events.map((event, index) => (
                        <div
                            key={index}
                            className="border border-black p-4 rounded-lg shadow-md hover:shadow-lg"
                        >
                            <div className="text-black font-medium">OPEN</div>
                            <h3 className="text-lg font-semibold mt-2">{event.eventName}</h3>
                            <p className="text-sm text-gray-600 mt-1">{event.eventVenue}</p>
                            <p className="text-sm text-gray-600 mt-1">{event.eventDate} at {event.eventTime}</p>
                            <p className="text-sm text-gray-600 mt-1">{event.eventDescription}</p>
                            <a href={event.eventLink} className="text-blue-500 mt-2 block">More Info</a>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold text-black mb-4">/events:upcoming</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {events.map((event, index) => (
                        <div
                            key={index}
                            className="border border-black p-4 rounded-lg shadow-md hover:shadow-lg"
                        >
                            <div className="text-black font-medium">OPEN</div>
                            <h3 className="text-lg font-semibold mt-2">{event.eventName}</h3>
                            <p className="text-sm text-gray-600 mt-1">{event.eventVenue}</p>
                            <p className="text-sm text-gray-600 mt-1">{event.eventDate} at {event.eventTime}</p>
                            <p className="text-sm text-gray-600 mt-1">{event.eventDescription}</p>
                            <a href={event.eventLink} className="text-blue-500 mt-2 block">More Info</a>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Events;