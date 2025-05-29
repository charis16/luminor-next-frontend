import TitlePage from "../_components/title-page";

import Team from "./_components/team";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen text-white flex flex-col md:flex-row">
      <TitlePage subtitle="About Luminor" title="Who We are?" />

      <div className="flex-1 md:ml-[120px] md:px-10 px-5 py-10 md:py-28">
        <h1 className="text-xl md:text-3xl font-bold uppercase text-gray-200">
          Every Frame Tells a Story
        </h1>
        <h2 className="text-md md:text-5xl font-extrabold uppercase text-white mt-2">
          Immortalizing Every Moment
        </h2>
        <p className="text-gray-400 my-6 max-w-7xl text-sm md:text-xl ">
          Luminor is not just a photography vendor, it is a team of passionate
          professionals dedicated to capturing the essence of every moment with
          artistic precision. We specialize in transforming stories into
          timeless visual masterpieces, ensuring that each frame reflects
          authenticity, emotion, and beauty. With a commitment to excellence,
          Luminor collaborates with clients to create bespoke photography
          experiences that go beyond expectations. Whether it’s weddings,
          portraits, or commercial projects, we bring creativity and expertise
          to deliver stunning results that leave a lasting impression.
        </p>

        <Team />
      </div>
    </div>
  );
}
