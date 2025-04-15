import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Bird from "../../models/Bird";

export const BirdList = () => {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const history = useHistory();

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/birds");
        if (!response.ok) {
          throw new Error("Failed to fetch birds");
        }
        const data = await response.json();
        setBirds(data);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching birds");
        setIsLoading(false);
      }
    };

    fetchBirds();
  }, []);

  const handleViewSightings = (id: number) => {
    history.push(`/birds/${id}/sightings/save`);
  };

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="container mt-3">
      <h2>List of birds</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Color</th>
            <th>Weight</th>
            <th>Height</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {birds.length > 0 ? (
            birds.map((bird) => (
              <tr key={bird.id}>
                <td>{bird.name}</td>
                <td>{bird.color}</td>
                <td>{bird.weight}</td>
                <td>{bird.height}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleViewSightings(bird.id)}
                  >
                    Add Sighting
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No birds found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
