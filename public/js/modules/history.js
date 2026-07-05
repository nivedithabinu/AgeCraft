const key = "1f1dc8150887a5b0f71e53cdc64c1376"; 

export async function historicData(year, month, day) {
    const mm = month.toString().padStart(2, '0');
    const dd = day.toString().padStart(2, '0');

    let e = "No major event found!";
    let b = "No major births found!";
    let movie = "Movie data not found!";

    try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${mm}/${dd}`);

        if (response.ok) {
            const data = await response.json();

            if (data.events && data.events.length > 0) {
                const r = Math.floor(Math.random() * Math.min(5, data.events.length));
                e = `In ${data.events[r].year}, ${data.events[r].text}`;
            }

            if (data.births && data.births.length > 0) {
                b = data.births[0].text;
            }
        }
    } 
    
    catch (error) {
        console.error("Wikipedia API Error:", error);
    }

    try {
        const movieKey = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&primary_release_year=${year}&sort_by=revenue.desc`);
        
        if (movieKey.ok) {
            const movieData = await movieKey.json();

            if (movieData.results && movieData.results.length > 0) {
                movie = `${movieData.results[0].title}`;
            } 
            
            else {
                movie = "No movie records found for this year.";
            }
        }
    } 
    
    catch (error) {
        console.error("API Error:", error);
    }

    return {
        eventText: e,
        birthText: b,
        movie: movie,
        song: "Requires Spotify API integration",
        tech: "Requires a custom tech database"
    };
}
