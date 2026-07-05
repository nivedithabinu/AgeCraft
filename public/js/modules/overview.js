export function generation(year) {
    if (year >= 1901 && year <= 1927) {
        return "The Greatest Generation";
    }

    else if (year >= 1928 && year <= 1945) {
        return "The Silent Generation";
    }

    else if (year >= 1946 && year <= 1964) {
        return "Baby Boomers";
    }

    else if (year >= 1965 && year <= 1980) {
        return "GenX";
    }

    else if (year >= 1981 && year <= 1996) {
        return "Millennials";
    }

    else if (year >= 1997 && year <= 2012) {
        return "Gen Z";
    }

    else if (year >= 2013 && year <= 2024) {
        return "Gen Alpha";
    }

    else if (year >= 2025 && year <= 2039) {
        return "Gen Beta";
    }
}

export function advice(age) {
    if (age < 18) {
        return {
            books: "Atomic Habits by James Clear",
            focus: "Choose your circle wisely, Protect your sleep"
        };
    }

    else if (age >= 18 && age <= 24) {
        return {
            books: "The Defining Decade: Why Your Twenties Matter - And How to Make the Most of Them Now by Dr. Meg Jay",
            focus: "Collect skills and not just job titles, Establish a fitness discipline"
        };
    }

    else if (age >= 25 && age <= 35) {
        return {
            books: "The Simple Path to Wealth by JL Collins",
            focus: "Shift from saving to investing, Protect your time fiercely"
        };
    }

    else {
        return {
            books: "The Psychology of Money by Morgan Housel",
            focus: "Quality over quantity in friendships, De-risk your lifestyle"
        };
    }
}