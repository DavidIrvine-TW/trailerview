import { NextResponse } from "next/server";
import { getMovieDetail, getMovieCredits, getMovieVideo, TMDB_TOKEN } from '../../../lib/TMDBEndpoints';


//get movie details/credits by  id
export async function GET(request, { params }) {
  const movieId = params.id;
  
  try {
    const response = await fetch(getMovieDetail(movieId), {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${TMDB_TOKEN}`
      }
    });

    const response2 = await fetch(getMovieCredits(movieId), {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${TMDB_TOKEN}`
      }
    });
    
    const response3 = await fetch(getMovieVideo(movieId), {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${TMDB_TOKEN}`
      }
    });

    const movieDetail = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to fetch movie detail data: ${response.statusText}`);
    }

    const movieCredits = await response2.json();
    if (!response2.ok) {
      throw new Error(`Failed to fetch movie credits data: ${response2.statusText}`);
    }
    const movieVideo = await response3.json();
    if (!response3.ok) {
      throw new Error(`Failed to fetch movie credits data: ${response3.statusText}`);
    }

    // console.log(movieDetail, movieCredits);
    return NextResponse.json({ movieDetail, movieCredits, movieVideo });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.error({ status: 500, body: 'Internal Server Error' });
  }
}
