"use client";
import React, { useState } from "react";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [showTracking, setShowTracking] = useState(false);

  const [availableDoctors] = useState([
    "Dr. Sarah Lee – Cardiologist",
    "Dr. Raj Mehta – Neurologist",
    "Dr. Aisha Khan – Pediatrician",
    "Dr. Rohan Das – Orthopedic",
    "Dr. Emily Clark – Dermatologist",
  ]);

  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctor, setDoctor] = useState("");
  const [notes, setNotes] = useState("");

  const [pain, setPain] = useState("");
  const [energy, setEnergy] = useState("");
  const [trackingNotes, setTrackingNotes] = useState("");
  const [trackingEntries, setTrackingEntries] = useState([]);

  const handleBook = (e) => {
    e.preventDefault();
    const newBooking = { date, time, doctor, notes };
    setBookings([...bookings, newBooking]);
    setDate("");
    setTime("");
    setDoctor("");
    setNotes("");
    setShowForm(false);
    setShowBookings(true);
  };

  const handleTracking = (e) => {
    e.preventDefault();
    const newEntry = { pain, energy, notes: trackingNotes, id: Date.now() };
    setTrackingEntries([newEntry, ...trackingEntries]);
    setPain("");
    setEnergy("");
    setTrackingNotes("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-green-50 to-pink-100 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-pink-500 text-center">
          Appointment 
          <h1 className="text-green-600">Dashboard </h1>
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => {
              setShowForm(true);
              setShowBookings(false);
              setShowTracking(false);
            }}
            className={`px-6 py-3 rounded-xl font-semibold shadow transition-all duration-200 ${
              showForm
                ? "bg-pink-600 text-white"
                : "bg-white border border-gray-200 hover:bg-pink-50 text-pink-700"
            }`}
          >
            ➕ Create Booking
          </button>

          <button
            onClick={() => {
              setShowBookings(true);
              setShowForm(false);
              setShowTracking(false);
            }}
            className={`px-6 py-3 rounded-xl font-semibold shadow transition-all duration-200 ${
              showBookings
                ? "bg-green-600 text-white"
                : "bg-white border border-gray-200 hover:bg-green-50 text-green-700"
            }`}
          >
            📋 My Bookings
          </button>

          <button
            onClick={() => {
              setShowTracking(!showTracking);
              setShowForm(false);
              setShowBookings(false);
            }}
            className={`px-6 py-3 rounded-xl font-semibold shadow transition-all duration-200 ${
              showTracking
                ? "bg-pink-400 text-white"
                : "bg-white border border-gray-200 hover:bg-pink-50 text-pink-700"
            }`}
          >
            💓 Track My Health
          </button>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          {showForm && (
            <div className="bg-white p-6 rounded-3xl shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Book an Appointment
              </h2>
              <form className="space-y-4" onSubmit={handleBook}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                    required
                  />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                    required
                  />
                </div>

                <select
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                  required
                >
                  <option value="">Select Doctor</option>
                  {availableDoctors.map((doc) => (
                    <option key={doc} value={doc}>
                      {doc}
                    </option>
                  ))}
                </select>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes (optional)"
                  className="w-full p-3 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                  rows={3}
                />
                <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-semibold shadow transition">
                  Book Appointment
                </button>
              </form>
            </div>
          )}

          {/* Available Doctors */}
          {!showBookings && !showTracking && (
            <div className="bg-white p-6 rounded-3xl shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Available Doctors
              </h2>
              <ul className="space-y-3">
                {availableDoctors.map((doc) => (
                  <li
                    key={doc}
                    className="p-3 bg-green-100 rounded-xl text-gray-700 font-medium"
                  >
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bookings Section */}
        {showBookings && (
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              My Bookings
            </h2>
            {bookings.length === 0 ? (
              <p className="text-gray-500">No bookings yet.</p>
            ) : (
              <ul className="space-y-3">
                {bookings.map((b, index) => (
                  <li
                    key={index}
                    className="p-4 bg-green-50 rounded-xl text-gray-700 border border-green-100"
                  >
                    <p>
                      <strong>Doctor:</strong> {b.doctor}
                    </p>
                    <p>
                      <strong>Date:</strong> {b.date} at {b.time}
                    </p>
                    {b.notes && (
                      <p>
                        <strong>Notes:</strong> {b.notes}
                      </p>
                    )}
                      <div className="mt-2 p-3 bg-pink-100 rounded-lg border border-pink-200">
          <p className="text-pink-700 font-medium">
            <strong>Treatment Plan:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Diagnosis : Migraine</li>
            <li>Recommended medicines : Medicine A, Medicicne B</li>
            <li>Lifestyle advice : Drink More ,Sleep Early</li>
          </ul>
        </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Patient Tracking Section */}
        {showTracking && (
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Patient Tracking
            </h2>
            <form className="space-y-4" onSubmit={handleTracking}>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="Pain Level (1-10)"
                  value={pain}
                  onChange={(e) => setPain(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                  required
                />
                <input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="Energy Level (1-10)"
                  value={energy}
                  onChange={(e) => setEnergy(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                  required
                />
              </div>
              <textarea
                value={trackingNotes}
                onChange={(e) => setTrackingNotes(e.target.value)}
                placeholder="Notes (optional)"
                className="w-full p-3 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                rows={3}
              />
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow transition">
                Add Tracking Entry
              </button>
            </form>

            {/* Tracking History */}
            <div className="mt-6">
              {trackingEntries.length === 0 ? (
                <p className="text-gray-500">No tracking entries yet.</p>
              ) : (
                <ul className="space-y-3">
                  {trackingEntries.map((entry) => (
                    <li
                      key={entry.id}
                      className="p-4 bg-green-50 rounded-xl text-gray-700 border border-green-100"
                    >
                      <p>
                        <strong>Pain Level:</strong> {entry.pain}
                      </p>
                      <p>
                        <strong>Energy Level:</strong> {entry.energy}
                      </p>
                      {entry.notes && (
                        <p>
                          <strong>Notes:</strong> {entry.notes}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
