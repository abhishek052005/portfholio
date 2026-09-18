import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  const url = `https://github.com/users/${username}/contributions`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "nextjs-github-contributions-proxy",
      Accept: "text/html,application/xhtml+xml,application/xml",
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Unable to fetch contributions" }, { status: 502 });
  }

  const text = await response.text();
  const svgStart = text.indexOf("<svg");
  const svgEnd = text.lastIndexOf("</svg>");

  if (svgStart === -1 || svgEnd === -1) {
    return NextResponse.json({ error: "SVG not found in response" }, { status: 502 });
  }

  const svg = text.slice(svgStart, svgEnd + 6);

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
