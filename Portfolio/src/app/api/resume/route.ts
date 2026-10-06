import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), "public");

    if (!fs.existsSync(publicDir)) {
      return NextResponse.json(
        { error: "Public directory not found." },
        { status: 404 }
      );
    }

    const files = await fs.promises.readdir(publicDir);
    const pdfFiles = files.filter((file) => file.toLowerCase().endsWith(".pdf"));

    if (pdfFiles.length === 0) {
      return NextResponse.json(
        { error: "No PDF resume found in public directory." },
        { status: 404 }
      );
    }

    // If multiple PDF files exist, pick the most recently updated one
    let targetPdf = pdfFiles[0];
    if (pdfFiles.length > 1) {
      const stats = await Promise.all(
        pdfFiles.map(async (file) => {
          const filePath = path.join(publicDir, file);
          const stat = await fs.promises.stat(filePath);
          return { file, mtimeMs: stat.mtimeMs };
        })
      );
      stats.sort((a, b) => b.mtimeMs - a.mtimeMs);
      targetPdf = stats[0].file;
    }

    const filePath = path.join(publicDir, targetPdf);
    const stat = await fs.promises.stat(filePath);
    const nodeStream = fs.createReadStream(filePath);
    const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

    const encodedFilename = encodeURIComponent(targetPdf);
    const safeFilename = targetPdf.replace(/"/g, '\\"');

    return new NextResponse(webStream, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": stat.size.toString(),
        "Content-Disposition": `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodedFilename}`,
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("[Resume Download Error]:", error);
    return NextResponse.json(
      { error: "Failed to download resume." },
      { status: 500 }
    );
  }
}
