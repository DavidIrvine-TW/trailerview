import { NextResponse } from "next/server"
import { getUpcomingMovies,getMovieVideo, TMDB_TOKEN } from '../../../../lib/TMDBEndpoints'

// fetch movie data by ID
async function fetchMovieData(id) {
    try {
      const response = await fetch(getMovieVideo(id), {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_TOKEN}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch movie data: ${response.statusText}`);
      }
  
      const movieData = await response.json();
      return { id, movieData };
    } catch (error) {
      console.error(`Error fetching movie data for ID ${id}:`, error);
      return { id, error };
    }
  }
  
  // GET COLLECTION - trending movies
  export async function GET(request, { params }) {
    const pages = params.id;
  
    try {
      const response = await fetch(getUpcomingMovies(pages), {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_TOKEN}`,
        },
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
  
      const { results, page, total_pages, total_results } = data;
  
      // Map the trending IDs and fetch movie data for each ID concurrently
      const trendingIds = results.map((item) => item.id);
      const promises = trendingIds.map(fetchMovieData);
  
      const movieDataArray = await Promise.all(promises);
  
      // Create a map to associate each ID with its corresponding movie data
      const movieDataMap = new Map();
      movieDataArray.forEach(({ id, movieData }) => {
        movieDataMap.set(id, movieData);
      });
  
      // Update the `results` array to include the `movieData` property
      const updatedResults = results.map((item) => ({
        ...item,
        movieData: movieDataMap.get(item.id),
      }));
  
      return NextResponse.json({
        results: updatedResults,
        page,
        total_pages,
        total_results,
      });
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.error({ status: 500, body: "Internal Server Error" });
    }
  }
  