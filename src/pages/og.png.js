import { generateOgImageForSite } from "@utils/generateOgImages";

export const GET = async () =>
  new Response(await generateOgImageForSite(), {
    headers: { "Content-Type": "image/png" },
  });
