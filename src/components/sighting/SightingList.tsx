import { useState, useEffect } from "react";

export const SightingList = () => {
  const [sightings, setSightings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSightings = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/sightings");
        if (!response.ok) {
          throw new Error("Failed to fetch sightings");
        }
        const data = await response.json();
        setSightings(data);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching sightings");
        setIsLoading(false);
      }
    };

    fetchSightings();
  }, []);

  if (isLoading) {
    return <div>Loading sightings...</div>
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-3">
      <h2>List of Sightings</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {sightings.length > 0 ? (
            sightings.map((sighting: any) => (
              <tr key={sighting.id}>
                <td>{sighting.id}</td>
                <td>{sighting.location}</td>
                <td>{new Date(sighting.dateTime).toLocaleDateString()}</td>
                <td>{new Date(sighting.dateTime).toLocaleTimeString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No sightings found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
