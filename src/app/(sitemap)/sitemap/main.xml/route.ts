import { generateSitemap } from "../../utils";

export async function GET() {
  return generateSitemap([
    { url: "/" },
    { url: "/drawings" },
    { url: "/photos" },
    { url: "/characters" },
  ]);
}
