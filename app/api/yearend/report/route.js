// app/api/yearend/report/route.js
import { NextResponse } from "next/server";

export async function GET() {
  if (!global.generatedReport) {
    return NextResponse.json(
      { message: "No report generated yet." },
      { status: 404 }
    );
  }

  return NextResponse.json(global.generatedReport);
}
