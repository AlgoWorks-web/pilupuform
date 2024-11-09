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
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                 const response = await axios.get(`http://localhost/fetch_event.php?eventId=${eventId}`);
                //const response = await axios.get(`https://zingreel.in/fetch_event.php?eventId=${eventId}`);
                setEventDetails(response.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };
    
        fetchEventDetails();
    }, [eventId]);
   
    const fetchGuests = async () => {
        try {
            const response = await axios.get(
                'http://localhost/fetch_guest.php', {
                // 'https://zingreel.in/fetch_guests.php', {
                params: { eventId, customerId, guestMobile }
            });
            if (response.data.success) {
                setGuests(response.data.guests);
            } else {
                console.error('Failed to fetch guests:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching guests:', error);
        }
    };

    const handleRSVP = async (status) => {
        //if (rsvpStatus) return; // Prevent multiple submissions
        if (hasSubmittedRsvp) return; // Prevent multiple submissions

        try {
            const response = await axios.post(
                 'http://localhost/rsvp_respond.php',
               // 'https://zingreel.in/rsvp_respond.php',
                
                { rsvpStatus: status, customerId, eventId, guestMobile },
                { headers: { 'Content-Type': 'application/json' } }
            );
            // setRsvpStatus(status);
            // alert('RSVP submitted successfully!');
            if (response.data.success) {
                setRsvpStatus('RSVP is sent successfully.');
                setHasSubmittedRsvp(true); // Mark as submitted

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
            const response = await axios.get('http://localhost/rsvp_status.php', {
                params: { eventId, guestMobile }
            });
            // const response = await axios.get('https://zingreel.in/rsvp_status.php', {
            //     params: { eventId, guestMobile }
            // });
            if (response.data.exists) {
                setRsvpStatus('RSVP is already submitted successfully.');
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

        const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(event_name)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent('Join the event!')}&location=${encodeURIComponent(event_location)}&sf=true&output=xml`;

        return calendarUrl;
    };
     // Function to format date
     const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className=" flex flex-col items-center mb-10 ">
            <div className='items-center text-4xl font-mono'>Invitation </div>
            {eventDetails && (
                 <>
                 {eventDetails.image_content && (
                    <img
                        src={`data:image/jpeg;base64,${eventDetails.image_content}`}
                        alt={eventDetails.file_name}
                        className="w-96 h-1/2 mb-4 rounded"
                    />
                )}
                <div className=" w-3/4 border bg-white p-8 rounded-xl max-w-2xl shadow-lg">
                    <h2 className="text-4xl text-center  mb-10 font-serif">{eventDetails.event_name}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 px-4 sm:flex-row justify-around">
                        <div className="mb-4 sm:mb-0">
                            <h3 className="text-lg font-semibold mb-3 text-gray-400">WHEN</h3>
                            {/* <p>{new Date(eventDetails.event_date).toLocaleDateString()}</p> */}
                            <p className='text-lg mb-2'>{formatDate(eventDetails.event_date)}</p>
                            {/* <p className='text-lg'>{eventDetails.event_time.split('.')[0]}</p> Remove milliseconds */}
                            <p>{new Date(`1970-01-01T${eventDetails.event_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-400">WHERE</h3>
                            <p className='text-lg'>{eventDetails.event_location}</p>
                        </div>
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
                        <h3 className="text-xl mb-4">Guests who RSVP'd:</h3>
                        <ul className="list-disc list-inside">
                            {guests.length > 0 ? guests.map((guest, index) => (
                                <li key={index}>{guest.guest_name} ({guest.guest_mobile})</li>
                            )) : (
                                <li>No guests have RSVP'd yet.</li>
                            )}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}

export default Invitation;
