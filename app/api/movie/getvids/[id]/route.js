import { NextResponse } from "next/server";
import { getMovieVideo, TMDB_TOKEN } from '../../../../lib/TMDBEndpoints';


//get movie details/credits by  id
export async function GET(request, { params }) {
  const movieId = params.id;
  
  try {
    const response = await fetch(getMovieVideo(movieId), {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${TMDB_TOKEN}`
      }
    });
    const movieVideo = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to fetch movie credits data: ${response.statusText}`);
    }
    return NextResponse.json({movieVideo});
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.error({ status: 500, body: 'Internal Server Error' });
  }
}
