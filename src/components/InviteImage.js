import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { FaCalendarAlt } from 'react-icons/fa'; // Calendar icon

const InviteImage = ({ customerId, eventId }) => {
    const [images, setImages] = useState([]);
    const [eventDetails, setEventDetails] = useState(null);

    useEffect(() => {
        // const fetchImages = async () => {
        //     try {
        //         const response = await axios.get('http://localhost:8080/images/by-customerid-eventid', {
        //             params: { customerId, eventId }
        //         });
        //         setImages(response.data);
        //     } catch (error) {
        //         console.error('Error fetching images:', error);
        //     }
        // };

        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/events/${eventId}`); // Updated URL
                setEventDetails(response.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        // fetchImages();
        fetchEventDetails();
    }, [customerId, eventId]);

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
            <h1 className="text-3xl font-bold mb-6">Image Gallery</h1>
            {/* <div className="flex flex-wrap justify-center">
                {images.map(image => (
                    <div key={image.id} className="m-4 text-center">
                        <img
                            src={`data:image/jpeg;base64,${image.data}`}
                            alt={image.name}
                            className="w-72 h-auto"
                        />
                    </div>
                ))}
            </div> */}
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
                    <hr className="my-6" />
                </div>
            )}
        </div>
    );
};

export default InviteImage;
