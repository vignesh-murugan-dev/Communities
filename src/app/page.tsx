import events from '../data/events.json';

export default function Home() {
return (
    <div>
    <header>
        <h1>Community Events</h1>
    </header>
    
    <main>
        <section>
        {events.map((event, index) => (
            <article key={index}>
            <h2>{event.eventName}</h2>
            <p>{event.eventDescription}</p>
            <div>
                <p>Date: {event.eventDate}</p>
                <p>Time: {event.eventTime}</p>
                <p>Venue: {event.eventVenue}</p>
                <p>Community: {event.communityName}</p>
                <a href={event.eventLink} target="_blank" rel="noopener noreferrer">
                Event Link
                </a>
            </div>
            </article>
        ))}
        </section>
    </main>
    </div>
);
}
