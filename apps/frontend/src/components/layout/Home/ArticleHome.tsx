import type { ReactNode } from "react";
import { cn } from "clsx-for-tailwind";

interface Props {
  titulo: string;
  descripcion?: string;
  children: ReactNode;
}
const ArticleHome = ({ titulo: title, descripcion, children }: Props) => {
  return (
    <article className={cn("flex justify-center p-10")}>
      <div className={cn("w-[1060px] h-full px-[15px]")}>
        <h3 className={cn("text-3xl font-bold w-fit mx-auto")}>{title}</h3>
        <p
          className={cn(
            "max-w-[800px] mx-auto text-center text-xl text-black/60",
            "mt-5",
          )}
        >
          {descripcion}
        </p>
        <section className={cn("flex justify-between mt-14 flex-wrap")}>
          {children}
        </section>
      </div>
    </article>
  );
};

export default ArticleHome;
