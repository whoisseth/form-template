// src/app/api/getCodeFile/route.ts

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const fileSrc = url.searchParams.get("fileSrc");

  if (!fileSrc) {
    return NextResponse.json(
      { error: "File source is required" },
      { status: 400 },
    );
  }

  const filePath = path.join(process.cwd(), fileSrc);

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json({ content: fileContent });
  } catch (error) {
    console.error(`Error reading file: ${filePath}`, error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
