import { cn } from "clsx-for-tailwind";
import ButtonHome from "../../uix/ButtonHome";
import { Link, useLocation } from "react-router";
import { useNavigate } from "react-router";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const HeaderLayout = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const handleButtonIniciarSesion = () => {
    navigate("/login");
  };
  const handleButtonRegistrar = () => {
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
          {location.pathname === "/" && (
            <>
              <SignedOut>
                <ButtonHome onClick={handleButtonIniciarSesion}>
                  iniciar sesión
                </ButtonHome>
              </SignedOut>
              <SignedOut>
                <ButtonHome secundario onClick={handleButtonRegistrar}>
                  Registrarse
                </ButtonHome>
              </SignedOut>
            </>
          )}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </section>
    </header>
  );
};

export default HeaderLayout;
