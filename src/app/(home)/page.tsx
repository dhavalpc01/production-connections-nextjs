import { HomeSection } from "@/wp/home/HomeContent";
import { wpMetadata } from "@/wp/WpDocument";

export const metadata = wpMetadata("home", "/");

export default function HomePage() {
  return <HomeSection />;
}
