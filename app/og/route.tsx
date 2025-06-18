import { ImageResponse } from "next/og";

export function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get("title") || "Next.js Portfolio Starter";

  return new ImageResponse(
    (
      <div
        tw="flex flex-col items-center justify-center w-full h-full px-20 py-16"
        style={{
          background: "linear-gradient(to right, #f8fafc, #e0f2fe)",
          color: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        <div tw="flex flex-col border border-slate-300 rounded-2xl p-10 shadow-xl bg-white max-w-4xl w-full">
          <h1 tw="text-6xl font-bold leading-tight tracking-tight">{title}</h1>
          <p tw="mt-6 text-3xl text-slate-500 text-center">Blog</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
