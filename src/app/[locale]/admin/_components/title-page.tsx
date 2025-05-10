import ButtonBack from "./button-back";

interface TitlePageProps {
  title: string;
  description: string;
  withBackButton?: boolean;
  urlBack?: string;
  children?: React.ReactNode;
}
export default function TitlePage({
  title,
  description,
  withBackButton = false,
  children,
  urlBack,
}: TitlePageProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2">
      <div className="inline-flex gap-4">
        {withBackButton && <ButtonBack urlBack={urlBack} />}
        <div className="max-w-3xl">
          <h1 className="font-bold text-2xl md:text-4xl tracking-wide">
            {title}
          </h1>
          <p className="text-gray-500 text-md md:text-lg mt-2">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
