import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Sighting from "../../models/Sighting";
import { fetchSightingsByBirdName } from "../../services/SightingService";

export const BirdSearch = () => {
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  const getQueryParam = (param: string) => {
    return new URLSearchParams(location.search).get(param);
  };

  useEffect(() => {
    const birdName = getQueryParam("birdName");

    if (birdName) {
      setLoading(true);
      setError(null);

      fetchSightingsByBirdName(birdName)
        .then((data) => {
          setSightings(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching sightings:", error);
          setLoading(false);
        });
    }
  }, [location]);

  return (
    <div className="container mt-3">
      <h2>Bird Sightings</h2>
      {sightings.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Location</th>
              <th>Datetime</th>
            </tr>
          </thead>
          <tbody>
            {sightings.map((sighting) => (
              <tr key={sighting.id}>
                <td>{sighting.id}</td>
                <td>{sighting.location}</td>
                <td>{sighting.dateTime.replace("T", " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
