import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import TrainCard from './components/TrainCard';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import EmptyState from './components/EmptyState';

const initialTrains = [
  {
    id: 1,
    trainNumber: '12127',
    trainName: 'Intercity Express',
    from: 'Pune',
    to: 'Mumbai',
    departure: '06:30',
    arrival: '10:10',
    duration: '3h 40m',
    seatsAvailable: 74,
    fare: { Sleeper: 350, AC3: 780, AC2: 1240 }
  },
  {
    id: 2,
    trainNumber: '11009',
    trainName: 'Deccan Queen',
    from: 'Pune',
    to: 'Mumbai',
    departure: '07:15',
    arrival: '10:25',
    duration: '3h 10m',
    seatsAvailable: 52,
    fare: { Sleeper: 320, AC3: 720, AC2: 1180 }
  },
  {
    id: 3,
    trainNumber: '12779',
    trainName: 'Goa Superfast',
    from: 'Pune',
    to: 'Goa',
    departure: '21:10',
    arrival: '08:30',
    duration: '11h 20m',
    seatsAvailable: 95,
    fare: { Sleeper: 540, AC3: 1180, AC2: 1760 }
  },
  {
    id: 4,
    trainNumber: '12951',
    trainName: 'Rajdhani Connect',
    from: 'Mumbai',
    to: 'Delhi',
    departure: '16:25',
    arrival: '08:05',
    duration: '15h 40m',
    seatsAvailable: 38,
    fare: { Sleeper: 840, AC3: 1680, AC2: 2490 }
  },
  {
    id: 5,
    trainNumber: '12618',
    trainName: 'Southern Breeze',
    from: 'Bengaluru',
    to: 'Chennai',
    departure: '05:45',
    arrival: '11:20',
    duration: '5h 35m',
    seatsAvailable: 66,
    fare: { Sleeper: 410, AC3: 870, AC2: 1430 }
  },
  {
    id: 6,
    trainNumber: '12051',
    trainName: 'Jan Shatabdi',
    from: 'Mumbai',
    to: 'Goa',
    departure: '06:05',
    arrival: '15:20',
    duration: '9h 15m',
    seatsAvailable: 81,
    fare: { Sleeper: 480, AC3: 1020, AC2: 1590 }
  }
];

export default function App() {
  const [trains, setTrains] = useState(initialTrains);
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState({
    from: '',
    to: '',
    date: ''
  });
  const [selectedTrain, setSelectedTrain] = useState(null);

  const filteredTrains = useMemo(() => {
    return trains.filter((train) => {
      const fromMatch = search.from
        ? train.from.toLowerCase().includes(search.from.toLowerCase())
        : true;

      const toMatch = search.to
        ? train.to.toLowerCase().includes(search.to.toLowerCase())
        : true;

      return fromMatch && toMatch;
    });
  }, [trains, search]);

  const handleSearch = (data) => {
    setSearch(data);
    setSelectedTrain(null);
  };

  const handleSelectTrain = (train) => {
    setSelectedTrain(train);
    window.scrollTo({ top: 680, behavior: 'smooth' });
  };

  const handleBookTicket = (bookingData) => {
    const trainIndex = trains.findIndex((t) => t.id === bookingData.trainId);

    if (trainIndex === -1) return;

    const train = trains[trainIndex];

    if (train.seatsAvailable < bookingData.seats) {
      alert('Not enough seats available.');
      return;
    }

    const farePerSeat = train.fare[bookingData.travelClass];
    const totalFare = farePerSeat * bookingData.seats;

    const booking = {
      bookingId: Date.now(),
      ...bookingData,
      trainNumber: train.trainNumber,
      trainName: train.trainName,
      from: train.from,
      to: train.to,
      departure: train.departure,
      arrival: train.arrival,
      totalFare,
      bookingStatus: 'CONFIRMED'
    };

    const updatedTrains = [...trains];
    updatedTrains[trainIndex] = {
      ...train,
      seatsAvailable: train.seatsAvailable - bookingData.seats
    };

    setTrains(updatedTrains);
    setBookings((prev) => [booking, ...prev]);
    setSelectedTrain(updatedTrains[trainIndex]);

    alert('Ticket booked successfully 🚆');
  };

  const handleCancelBooking = (bookingId) => {
    const bookingToCancel = bookings.find((b) => b.bookingId === bookingId);
    if (!bookingToCancel) return;

    const updatedTrains = trains.map((train) =>
      train.id === bookingToCancel.trainId
        ? { ...train, seatsAvailable: train.seatsAvailable + bookingToCancel.seats }
        : train
    );

    setTrains(updatedTrains);
    setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));

    if (selectedTrain && selectedTrain.id === bookingToCancel.trainId) {
      const refreshed = updatedTrains.find((t) => t.id === bookingToCancel.trainId);
      setSelectedTrain(refreshed || null);
    }
  };

  return (
    <div className="app-shell">
      <Navbar />
      <Hero />
      <main className="container">
        <SearchForm onSearch={handleSearch} />

        <section className="section-block">
          <div className="section-heading">
            <h2>Available Trains</h2>
            <p>Search routes,  and choose your perfect ride.</p>
          </div>

          <div className="train-grid">
            {filteredTrains.length > 0 ? (
              filteredTrains.map((train) => (
                <TrainCard
                  key={train.id}
                  train={train}
                  onSelect={handleSelectTrain}
                  isSelected={selectedTrain?.id === train.id}
                />
              ))
            ) : (
              <EmptyState
                title="No trains found"
                message="Try changing the source or destination. Your railway adventure is hiding behind different filters."
              />
            )}
          </div>
        </section>

        <section className="section-block booking-layout">
          <div>
            <div className="section-heading">
              <h2>Book Your Ticket</h2>
              <p>Choose a train and fill passenger details to confirm booking.</p>
            </div>
            <BookingForm
              selectedTrain={selectedTrain}
              journeyDate={search.date}
              onBook={handleBookTicket}
            />
          </div>

          <div>
            <div className="section-heading">
              <h2>Your Bookings</h2>
              <p>View confirmed tickets and cancel them anytime.</p>
            </div>
            <BookingList bookings={bookings} onCancel={handleCancelBooking} />
          </div>
        </section>
      </main>
    </div>
  );
}