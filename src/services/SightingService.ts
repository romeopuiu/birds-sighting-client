import axios from "axios";
import Sighting from "../models/Sighting";

export const fetchSightingsByBirdName = async (birdName: string): Promise<Sighting[]> => {
  try {
    const encodedBirdName = encodeURIComponent(birdName);
    const response = await axios.get(`http://localhost:8080/api/birds/search-by-name/sightings?birdName=${encodedBirdName}`);
    return response.data.map((item: any) => new Sighting(item.id, item.bird, item.location, item.dateTime));
  } catch (error) {
    console.error("Error fetching sightings:", error);
    throw error;
  }
};