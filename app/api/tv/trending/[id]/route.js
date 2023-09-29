import { NextResponse } from "next/server"
import { getTrendingTV,getTVVideos, TMDB_TOKEN } from '../../../../lib/TMDBEndpoints'

//GET COLLECTION - trending TV

//GET COLLECTION - airingtoday TV
export async function GET(request, { params }) {
    const pages = params.id;
  
    try {
      const response = await fetch(getTrendingTV(pages), {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_TOKEN} `,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
  
      const { results, page, total_pages, total_results } = data;
      const trendingIds = results.map((item) => item.id);
      const promises = trendingIds.map(fetchTVData);
  
      const movieDataArray = await Promise.all(promises);

      const movieDataMap = new Map();
      movieDataArray.forEach(({ id, movieData }) => {
        movieDataMap.set(id, movieData);
      });
  
 
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
  
  async function fetchTVData(id) {
    try {
      const response = await fetch(getTVVideos(id), {
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