import { cn } from "clsx-for-tailwind";
import ButtonHome from "../../ui/ButtonHome";
import { Link, useNavigate } from "react-router";

const HeaderLayout = () => {
  const navigate = useNavigate();

  const handleButtonIniciarSesion = () => {
    navigate("/login");
  };

  const handleButtonRegistar = () => {
    navigate("/registro");
  };
  return (
    <header className={cn("h-15 bg-white flex justify-center")}>
      <section
        className={cn(
          "w-[1060px] h-full px-[15px]",
          "flex items-center justify-between",
        )}
      >
        <Link to={"/"}>
          <h1 className={cn("text-orange-500 text-2xl font-bold")}>
            Vocab<span className={cn("text-black")}>IA</span>
          </h1>
        </Link>

        <div className={cn("flex gap-3")}>
          <ButtonHome onClick={handleButtonIniciarSesion}>
            Iniciar sesión
          </ButtonHome>
          <ButtonHome secundario onClick={handleButtonRegistar}>
            Registarse
          </ButtonHome>
        </div>
      </section>
    </header>
  );
};

export default HeaderLayout;
