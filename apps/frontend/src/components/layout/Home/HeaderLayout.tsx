import { cn } from "clsx-for-tailwind";
import ButtonHome from "../../ui/ButtonHome";

const HeaderLayout = () => {
  return (
    <header className={cn("h-15 bg-white flex justify-center")}>
      <section
        className={cn(
          "w-[1060px] h-full px-[15px]",
          "flex items-center justify-between",
        )}
      >
        <h1 className={cn("text-orange-500 text-2xl font-bold")}>
          Vocab<span className={cn("text-black")}>IA</span>
        </h1>

        <div className={cn("flex gap-3")}>
          <ButtonHome>Iniciar seseión</ButtonHome>
          <ButtonHome secundario>Registarse</ButtonHome>
        </div>
      </section>
    </header>
  );
};

export default HeaderLayout;
