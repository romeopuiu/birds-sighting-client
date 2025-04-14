import { useState } from "react";
import { useParams } from "react-router-dom";

export const AddNewSighting = () => {
  const { birdId } = useParams<{ birdId: string }>();
  const numericBirdId = Number(birdId);
  const [location, setLocation] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  async function submitNewSighting(event: React.FormEvent) {
    event.preventDefault();

    if (!location || !dateTime || isNaN(numericBirdId)) {
      setDisplayWarning(true);
      setDisplaySuccess(false);
      return;
    }

    const sighting = {
      location,
      dateTime,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/birds/${numericBirdId}/sightings/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sighting),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit sighting.");
      }

      setLocation("");
      setDateTime("");
      setDisplayWarning(false);
      setDisplaySuccess(true);
    } catch (error) {
      console.error(error);
      setDisplayWarning(true);
      setDisplaySuccess(false);
    }
  }
  return (
    <div className="container mt-5 mb-5">
      {displaySuccess && (
        <div className="alert alert-success" role="alert">
          Sighting added successfully
        </div>
      )}
      {displayWarning && (
        <div className="alert alert-danger" role="alert">
          Please fill in all required fields
        </div>
      )}
      <div className="card">
        <div className="card-header">Add a New Sighting</div>
        <div className="card-body">
          <form onSubmit={submitNewSighting}>
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Date & Time</label>
              <input
                type="datetime-local"
                className="form-control"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                required
                placeholder="Select date and time"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Sighting
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
