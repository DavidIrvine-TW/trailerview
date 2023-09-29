import { NextResponse } from "next/server";
import { getTVDetail, getTvCredits, getTVVideos, TMDB_TOKEN } from '../../../lib/TMDBEndpoints';


//get movie details by unique id


export async function GET(request, { params }) {
  const TvId = params.id;

  try {
    const response = await fetch(getTVDetail(TvId), {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${TMDB_TOKEN}`
      }
    });

    const response2 = await fetch(getTvCredits(TvId), {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${TMDB_TOKEN}`
      }
    });
    const response3 = await fetch(getTVVideos(TvId), {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${TMDB_TOKEN}`
      }
    });

    const tvDetail = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to fetch movie detail data: ${response.statusText}`);
    }

    const tvCredits = await response2.json();
    if (!response2.ok) {
      throw new Error(`Failed to fetch movie credits data: ${response2.statusText}`);
    }
    const tvVideos = await response3.json();
    if (!response3.ok) {
      throw new Error(`Failed to fetch movie credits data: ${response3.statusText}`);
    }

    console.log(tvDetail, tvCredits);
    return NextResponse.json({ tvDetail, tvCredits, tvVideos });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.error({ status: 500, body: 'Internal Server Error' });
  }
}
