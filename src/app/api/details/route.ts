import { NextResponse } from 'next/server';
import axios from 'axios'

export async function GET(request: Request) {
  const apiKey = process.env.RAWG_API_KEY;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;

  const {data} = await axios.get(url);
  
  return NextResponse.json(data);
}