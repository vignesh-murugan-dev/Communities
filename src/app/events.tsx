"use client"
import React from 'react';
import events from '../data/events.json';
import { MapPin } from 'phosphor-react';

const Events = () => {
    const EventCard = ({ location, title, date, venue }) => (
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="inline-block bg-black text-white text-xs px-2 py-1 rounded">
                {location}
            </div>
            <h3 className="text-base font-medium mt-3 mb-2">{title}</h3>
            <div className="flex-row items-center text-sm text-gray-600 space-y-2">
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                    {date}
                </span>
                <span className="text-xs flex items-start space-x-1">
                <MapPin size={16} />
                    {venue}
                </span>
            </div>
        </div>
    );

    const monthlyEvents = events.filter(event => {
        const currentDate = new Date();
        const eventDate = new Date(event.eventDate);
        return eventDate.getMonth() === currentDate.getMonth(); 
    });

    const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.eventDate);
        return eventDate > new Date();
    });

    return (
        <main className="p-4 bg-white px-8 py-8 rounded-xl">
            <section>
                <h2 className="text-lg font-normal mb-6">/events:<span className='text-black font-bold'>december</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {monthlyEvents.map((event, index) => (
                        <EventCard
                            key={index}
                            location={event.communityName}
                            title={event.eventName}
                            date={event.eventDate}
                            venue={event.eventVenue}
                        />
                    ))}
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-lg font-normal mb-6">/events:upcoming</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {upcomingEvents.map((event, index) => (
                        <EventCard
                            key={index}
                            location={event.communityName}
                            title={event.eventName}
                            date={event.eventDate}
                            venue={event.eventVenue}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Events;