import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt } from 'react-icons/fa'; // Calendar icon

const useQuery = () => {
    return new URLSearchParams(window.location.search);
};

const Invitation = () => {
    const query = useQuery();
    const customerId = query.get('customerId');
    const eventId = query.get('eventId');
    const guestMobile = query.get('guestMobile');

    const [eventDetails, setEventDetails] = useState(null);
    const [rsvpStatus, setRsvpStatus] = useState('');

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/events/${eventId}`);
                setEventDetails(response.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    const handleRSVP = async (status) => {
        if (rsvpStatus) return; // Prevent multiple submissions

        try {
            const response = await axios.post(
                'http://localhost:8080/rsvp/respondmobile',
                { rsvpStatus: status },
                {
                    params: { customerId, eventId, guestMobile },
                }
            );
            setRsvpStatus(status);
            alert('RSVP submitted successfully!');
        } catch (error) {
            console.error('Error submitting RSVP:', error);
            alert('Failed to submit RSVP');
        }
    };

    const generateGoogleCalendarUrl = () => {
        if (!eventDetails) return '#';

        const { eventName, eventDate, eventTime, eventLocation } = eventDetails;

        const startDateTime = new Date(`${eventDate}T${eventTime}`).toISOString().replace(/-|:|\.\d\d\d/g, '');
        const endDateTime = new Date(new Date(`${eventDate}T${eventTime}`).getTime() + 3600000).toISOString().replace(/-|:|\.\d\d\d/g, '');

        const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(eventName)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent('Join the event!')}&location=${encodeURIComponent(eventLocation)}&sf=true&output=xml`;

        return calendarUrl;
    };

    return (
        <div className="bg-emerald-100 flex flex-col items-center my-8">
            <div className='items-center text-4xl'>Invitation Details</div>
            {eventDetails && (
                <div className="mt-8 w-3/4 border bg-white p-8 rounded-xl max-w-2xl shadow-lg">
                    <h2 className="text-3xl text-center font-bold mb-10">{eventDetails.eventName}</h2>
                    <div className="grid grid-cols-2 px-4 sm:flex-row justify-around">
                        <div className="mb-4 sm:mb-0">
                            <h3 className="text-lg font-semibold text-gray-600">WHEN</h3>
                            <p>{new Date(eventDetails.eventDate).toLocaleDateString()}</p>
                            <p>{eventDetails.eventTime}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-600">WHERE</h3>
                            <p>{eventDetails.eventLocation}</p>
                        </div>
                        <div className="mt-8 flex items-center justify-center">
                            <a
                                href={generateGoogleCalendarUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-500 hover:text-blue-700"
                            >
                                <FaCalendarAlt className="mr-2" /> Add to Google Calendar
                            </a>
                        </div>
                    </div>
                    <hr className="my-6 flex items-center" />
                    <div className="rsvp-section mt-4 flex flex-col items-center">
                        <h3 className="text-xl mb-4">RSVP to the Invitation</h3>
                        <div className="flex justify-center space-x-4"> {/* Use space-x-4 for spacing */}
                            <button onClick={() => handleRSVP('Yes')} className="bg-green-500 text-white px-4 py-2 rounded">Yes</button>
                            <button onClick={() => handleRSVP('No')} className="bg-red-500 text-white px-4 py-2 rounded">No</button>
                        </div>
                        {rsvpStatus && <p className="mt-2">Your RSVP: {rsvpStatus}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Invitation;
