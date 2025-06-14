import { NextResponse } from 'next/server';

export async function GET(request) {
  // NextResponse.json() automatically sets the status to 200
  return NextResponse.json({ name: 'Hello, World!' });
}

