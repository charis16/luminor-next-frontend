import BackToTop from "../../../_components/back-to-top";
import TitlePage from "../../../_components/title-page";
import GridAlbum from "../../_components/grid-album";

export async function generateMetadata(props: {
  params: Promise<{ name: string; category: string; albumId: string }>;
}) {
  const { name, category, albumId } = await props.params;

  return {
    title: `Our Work - ${name || "Our Work"}-${category}-${albumId}`,
  };
}

export default async function ServicePage(props: {
  params: Promise<{ name: string; category: string; albumId: string }>;
}) {
  const { name, category, albumId } = await props.params;

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col md:flex-row">
      <TitlePage subtitle={albumId} title={category} />
      <div className="flex-1 md:ml-[120px] md:px-10 px-5 py-10 md:py-32">
        <p className="text-white mt-4 text-2xl md:text-4xl">
          Experience the joy and beauty of weddings through our stunning
          collection. Let us help you create unforgettable memories on your
          special day.
        </p>
        <GridAlbum showTab={false} />
        <BackToTop />
      </div>
    </div>
  );
}
