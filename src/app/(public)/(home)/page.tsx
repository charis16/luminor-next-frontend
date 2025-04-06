import Contact from "./_components/contact";
import Description from "./_components/description";
import HeroVideo from "./_components/hero-video";
import LatestRecent from "./_components/latest-work";

export default function Home() {
  return (
    <>
      <HeroVideo />
      <Description />
      <LatestRecent />
      <Contact />
    </>
  );
}
