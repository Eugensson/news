import Image from "next/image";

interface NoResultsProps {
  title: string;
}

export const NoResults = ({ title }: NoResultsProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-10">
      <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-center">
        {title}
      </h2>
      <div className="relative overflow-hidden w-[248px] md:w-[560px] lg:w-[600px] h-[198px] md:h-[444px] lg:h-[478px]">
        <Image
          src="/placeholder.png"
          alt="Placeholder"
          fill
          quality={100}
          className="object-contain"
        />
      </div>
    </div>
  );
};
