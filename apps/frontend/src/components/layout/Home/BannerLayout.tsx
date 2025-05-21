import ButtonHome from "../../ui/ButtonHome";
import imagenCardBanner from "../../assets/imagenes/Tarejeta de Banner.png";
import { cn } from "clsx-for-tailwind";

const BannerLayout = () => {
  return (
    <article className={cn("bg-orange-100 flex justify-center py-10")}>
      <section className={cn("w-[1060px] h-full px-[15px]", "flex gap-5")}>
        <div className={cn("flex flex-col justify-around items-center")}>
          <div>
            <h2 className={cn("text-5xl font-semibold")}>
              Aprendiendo nuevas palabras con ayuda de
              <span className={cn("text-orange-500")}> VocabIA</span>
            </h2>
            <p className={cn("text-2xl text-black/60 mt-2")}>
              Tarjetas de memoria personalizadas según tu nivel y preferencias
              para dominar cualquier idioma.
            </p>
          </div>

          <ButtonHome secundario>Emprecemos a Aprender</ButtonHome>
        </div>

        <img src={imagenCardBanner} alt="Imagen de Card de la app" />
      </section>
    </article>
  );
};

export default BannerLayout;
