// app/api/anime/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { query, variables } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: "Missing GraphQL query" },
        { status: 400 }
      );
    }

    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "AniList API error", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    );
  }
}
