export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server"
import { getGenreTV, TMDB_TOKEN } from '../../lib/TMDBEndpoints'

//GET TV GENRE LIST
export async function GET(request) {
   
    try {
        const response = await fetch(getGenreTV(), {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_TOKEN} `
              }
          })
        const data = await response.json()
        if (!response.ok){
            throw new Error(`Failed to fetch data: ${response.statusText}`)
        }
        const {genres} = data
        console.log(data)
        return NextResponse.json({genres})
    }
    catch (error) {
        console.error('Error:', error)
        return NextResponse.error({status: 500, body: 'Internal Server Error'})
    }
}
