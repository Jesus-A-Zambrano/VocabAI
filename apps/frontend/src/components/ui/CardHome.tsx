import { cn } from "clsx-for-tailwind";

interface Props {
  img: {
    src: string;
    alt: string;
  };
  titulo: string;
  parrafo: string;
}
const CardHome = ({ titulo, parrafo, img }: Props) => {
  return (
    <div className={cn("w-[310px] bg-orange-100 p-6 rounded-xl")}>
      <img
        className={cn("bg-orange-200/80 p-1 rounded-2xl")}
        src={img.src}
        alt={img.alt}
      />
      <h4 className={cn("text-2xl font-bold my-1")}>{titulo}</h4>
      <p className={cn("text-lg")}>{parrafo}</p>
    </div>
  );
};

export default CardHome;
