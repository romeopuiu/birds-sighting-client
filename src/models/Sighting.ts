import Bird from "./Bird";

class Sighting {
    id: number;
    bird: Bird;
    location: string;
    dateTime: string;

    constructor(id: number, bird: Bird, location: string, dateTime: string) {
        this.id = id;
        this.bird = bird;
        this.location = location;
        this.dateTime = dateTime;
    }
}

export default Sighting;