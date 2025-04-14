import Sighting from "./Sighting";

class Bird {
    id: number;
    name: string;
    color: string;
    weight: number;
    height: number;
    sightings: Sighting[];

    constructor(id: number, name: string, color: string, weight: number, height: number, sightings: any[]) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.weight = weight;
        this.height = height;
        this.sightings = sightings;
    }
}

export default Bird;
