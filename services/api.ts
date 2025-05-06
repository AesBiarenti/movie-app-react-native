export const TMDB_CONFIG = {
    BASE_URL : "https://api.themoviedb.org/3",
    API_KEY : process.env.EXPO_PUBLIC_API_KEY,
    headers:{
        accept:'application/json',
        Authorization:`Bearer ${process.env.EXPO_PUBLIC_API_KEY}`
    }
}
export const fetchPopularMovies = async ({query}:{query:string})=>{
    const endpoint = query 
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint,{
        method:'GET',
        headers:TMDB_CONFIG.headers
    });
    if (!response.ok) {
        //@ts-ignore
        throw new Error("Failed to fetch movies",response.statusText);
    }
    const data = await response.json();
    return data.results;
} 
export const fetchMoviDetails = async (movieId:string):Promise<MovieDetails>=>{
    try {
        const response = 
        await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,{
            method:"GET",
            headers:TMDB_CONFIG.headers,
        })
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const data = response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDU0ZTJjMmE1NTU3ODA5ODE0MDZmODdjODBiNGIzMyIsIm5iZiI6MTczMTQyMDI5OS40NTgsInN1YiI6IjY3MzM2MDhiYjljYmRhYmUyOWMyYzgyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n6fDvqdtXrPfgE6fqKkO_FxgYBA0qNp2MY85XqYKhmI'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));