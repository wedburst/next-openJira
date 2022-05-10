import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log("Middleware API Called");
//   if(req.page.name === '/api/entries') return NextResponse.next();

  const id = req.page.params?.id || '';

  const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

  if (!checkMongoIDRegExp.test(id)) {
    // return res.status(400).json({ message: "ID no es válido " + id });
    return new Response(JSON.stringify({ message: "ID no es válido " + id }), {
        status: 400,
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

  return NextResponse.next();
}
