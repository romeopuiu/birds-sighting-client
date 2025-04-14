import { useState, useEffect } from "react";

export const BirdService = () => {
  const [birds, setBirds] = useState<any[]>([]);

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/birds");
        const data = await response.json();
        setBirds(data);
      } catch (error) {
        console.error("Error fetching birds:", error);
      }
    };

    fetchBirds();
  }, []);

  return birds;
};
