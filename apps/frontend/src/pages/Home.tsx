import BannerLayout from "../components/layout/Home/BannerLayout";
import ArticleHome from "../components/layout/Home/ArticleHome";
import CardHome from "../components/ui/CardHome";
import iconFoco from "../assets/icons/foco.png";
import iconTablero from "../assets/icons/tablero.png";
import iconBarras from "../assets/icons/barras.png";
import FooterLayout from "../components/layout/Home/FooterLayout";

const Home = () => {
  return (
    <>
      <BannerLayout />
      <ArticleHome
        titulo="¿Cómo funciona VocabIA?"
        descripcion="Nuestra plataforma utiliza inteligencia artificial para personalizar tu experiencia de aprendizaje."
      >
        <CardHome
          img={{ src: iconFoco, alt: "Icono de un foco" }}
          titulo="Recomendaciones personales"
          parrafo="Algoritmo inteligente que sugiere palabras basadas en tu nivel y preferencias de aprendizaje."
        />
        <CardHome
          img={{ src: iconTablero, alt: "Icono de tablero" }}
          titulo="Tarjeta de memoria efectivas"
          parrafo="Sistema de repetición espaciada para ayudarte a recordar palabras a largo plazo."
        />
        <CardHome
          img={{ src: iconBarras, alt: "Icono de barrs" }}
          titulo="Seguimiento de progreso"
          parrafo="Visualiza tu avance y recibe informes detallados sobre tu aprendizaje"
        />
      </ArticleHome>
      <FooterLayout />
    </>
  );
};

export default Home;
