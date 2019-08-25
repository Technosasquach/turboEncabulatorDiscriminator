const firstName: string[] = [
    "William",
    "Henry",
    "Nicholas",
    "Wayne",
    "Jeremy",
    "Samuel",
    "Roy",
    'Dennis',
    "Albert",
    "Ethan",
    "Edward",
    "Joe",
    "Kyle"
]

const lastName: string[] = [
    "Mills",
    "Fernandez",
    "Gonzales",
    "Bradley",
    "Burke",
    "Alvarez",
    "Brewer",
    'Parker',
    "McDonald",
    "Hopkins",
    "Wheeler",
    "Stephens",
    "Campbell"
]

export class NameGen {

    static randomFirstName(): string {
        return firstName[Math.floor(Math.random() * firstName.length)];
    }

    static randomLastName(): string {
        return lastName[Math.floor(Math.random() * lastName.length)];
    }

    static generateName(): string {
        return this.randomFirstName() + " " + this.randomLastName();
    }
}