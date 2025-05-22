import { cn } from "clsx-for-tailwind";

const FooterLayout = () => {
  let i = 0;

  const teamMembers = [
    {
      name: "Percy Sebastian López M.",
      role: "Frontend",
      social: {
        email: "p.sebastian.23.11.99@gmail.com",
        linkedin: "www.linkedin.com/in/p-sebastian-l-m-015413261",
      },
    },
    {
      name: "Jesús Zambrano",
      role: "Analista",
      social: {
        email: "jesusalbertoazb@gmail.com",
        linkedin: "https://www.linkedin.com/in/jesus-zambrano-barrios/",
      },
    },
    {
      name: "Jorge Valderrama",
      role: "Analista",
      social: {
        email: "jvfermoso@gmail.com",
        linkedin: "https://linkedin.com/in/valdi",
      },
    },
    {
      name: "Danny Mejía",
      role: "Backend",
      social: {
        email: "dannym.mejia@gmail.com",
        linkedin: "https://www.linkedin.com/in/danny-mv/",
      },
    },
    {
      name: "Leodan Valda",
      role: "FrontEnd",
      social: {
        email: "lvalda.dev@gmail.com",
        linkedin: " https://www.linkedin.com/in/lenzx",
      },
    },
  ];

  return (
    <footer className={cn("bg-gray-800 text-white py-6")}>
      <div className="container mx-auto text-center">
        <h2 className="text-lg font-semibold mb-4">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {teamMembers.map((member) => (
            <div key={i++} className="p-4 bg-gray-700 rounded-lg">
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-sm text-gray-300">{member.role}</p>
              <div className="mt-2 flex justify-center space-x-4">
                <a
                  href={`mailto:${member.social.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500"
                >
                  E-mail
                </a>
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-gray-400">
          © No Country: Proyecto Expres
        </p>
      </div>
    </footer>
  );
};

export default FooterLayout;
