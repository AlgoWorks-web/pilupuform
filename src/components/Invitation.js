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
    const [hasSubmittedRsvp, setHasSubmittedRsvp] = useState(false);
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state to control spinner visibility

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`https://e-gumastha.com/api/events/fetch_event/${eventId}`);
                setEventDetails(response.data);
                setLoading(false); // Set loading to false when data is fetched
            } catch (error) {
                console.error('Error fetching event details:', error);
                setLoading(false); // Set loading to false even in case of error
            }
        };

        fetchEventDetails();
    }, [eventId]);

    const fetchGuests = async () => {
        try {
            // const response = await axios.get(`http://127.0.0.1:8000/api/rsvp/${eventId}`);
            const response = await axios.get(`https://e-gumastha.com/api/rsvp/${eventId}`);
            setGuests(response.data.guests || []);
        } catch (error) {
            console.error('Error fetching guests:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGuests();
    }, [eventId]);


    const handleRSVP = async (status) => {
        if (hasSubmittedRsvp) return; // Prevent multiple submissions

        try {
            const response = await axios.post(
                'https://e-gumastha.com/api/rsvp',
                { rsvpStatus: status, customerId, eventId, guestMobile },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.data.success) {
                setRsvpStatus('RSVP is sent successfully.');
                setHasSubmittedRsvp(true);
            } else {
                setRsvpStatus(response.data.message || 'Failed to submit RSVP');
            }
        } catch (error) {
            console.error('Error submitting RSVP:', error);
            alert('Failed to submit RSVP');
        }
    };

    const checkRsvpStatus = async () => {
        try {
            const response = await axios.get('https://e-gumastha.com/api/rsvp_status', {
                params: { eventId, guestMobile }
            });
            if (response.data.exists) {
                setRsvpStatus(`RSVP is already submitted as : ${response.data.rsvp_status}`);
                setHasSubmittedRsvp(true); // Mark as submitted
            }
        } catch (error) {
            console.error('Error checking RSVP status:', error);
        }
    };

    useEffect(() => {
        if (guestMobile) {
            checkRsvpStatus();
        }
    }, [guestMobile]);

    const generateGoogleCalendarUrl = () => {
        if (!eventDetails) return '#';

        const { event_name, event_date, event_time, event_location } = eventDetails;
        const startDateTime = new Date(`${event_date}T${event_time.split('.')[0]}`).toISOString().replace(/-|:|\.\d\d\d/g, '');
        const endDateTime = new Date(new Date(`${event_date}T${event_time.split('.')[0]}`).getTime() + 3600000).toISOString().replace(/-|:|\.\d\d\d/g, '');

        return `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(event_name)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent('Join the event!')}&location=${encodeURIComponent(event_location)}&sf=true&output=xml`;
    };

    // Function to format date
    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Circular Spinner CSS
    const spinnerStyle = {
        border: '4px solid #f3f3f3', /* Light grey */
        borderTop: '4px solid #3498db', /* Blue */
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 2s linear infinite',
        margin: 'auto',  // Centers the spinner
    };

    return (
        <div className="flex flex-col items-center mb-10">
            <div className="items-center text-4xl font-mono">Invitation</div>

            {loading ? (
                <div style={spinnerStyle}></div> // Show loading spinner when data is being fetched
            ) : (
                <>
                    {eventDetails && (
                        <>
                            <img
                                src={`data:${eventDetails.image_mime_type};base64,${eventDetails.invitationImage}`}
                                alt={eventDetails.file_name}
                                className="w-80 h-2/3 rounded"
                            />
                            <div className="w-3/4 border bg-white p-8 rounded-xl max-w-2xl shadow-lg">
                                <h2 className="text-4xl text-center mb-10 font-serif">{eventDetails.event_name}</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 px-4 sm:flex-row justify-around">
                                    <div className="mb-4 sm:mb-0">
                                        <h3 className="text-lg font-semibold mb-3 text-gray-400">WHEN</h3>
                                        <p className="text-lg mb-2">{formatDate(eventDetails.event_date)}</p>
                                        <p>{new Date(`1970-01-01T${eventDetails.event_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 text-gray-400">WHERE</h3>
                                        <p className="text-lg">{eventDetails.event_location}</p>
                                    </div>
                                </div>
                                <div className="mt-4 , ml-3">
                                    <h3 className="text-lg font-semibold mb-3 text-gray-400">HOSTED By </h3>
                                    <p className="text-lg">{eventDetails.host_name}</p>
                                </div>
                                <div className="mt-8 flex items-center justify-center">
                                    <a
                                        href={generateGoogleCalendarUrl()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-blue-500 hover:text-blue-700"
                                    >
                                        <FaCalendarAlt className="mr-2" /> Add to Calendar
                                    </a>
                                </div>
                                <hr className="my-6 flex items-center" />

                                <div className="rsvp-section mt-4 flex flex-col items-center">
                                    {!hasSubmittedRsvp ? (
                                        <>
                                            <h3 className="text-xl mb-4">RSVP to the Invitation</h3>
                                            <div className="flex justify-center space-x-4">
                                                <button onClick={() => handleRSVP('Yes')} className="bg-green-500 text-white px-4 py-2 rounded">Yes</button>
                                                <button onClick={() => handleRSVP('No')} className="bg-red-500 text-white px-4 py-2 rounded">No</button>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="mt-2">{rsvpStatus}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 w-3/4 max-w-2xl">
                                <h3 className="text-xl mb-4">Guests who RSVP'd 'Yes':</h3>
                                {loading ? (
                                    <div>Loading...</div>
                                ) : (
                                    <ul className="list-disc list-inside">
                                        {guests.length > 0 ? (
                                            guests.map((guest, index) => (
                                                <li key={index}>
                                                    {guest.guest_name} 
                                                </li>
                                            ))
                                        ) : (
                                            <li>No guests have RSVP'd yet.</li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Invitation;
