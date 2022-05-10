import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextFetchEvent, res: NextResponse) {
    console.log("Middleware");

    return NextResponse.next();
}