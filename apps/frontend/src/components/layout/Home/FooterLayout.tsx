import { cn } from "clsx-for-tailwind";

const FooterLayout = () => {
  let i = 0;

  const teamMembers = [
    {
      name: "Percy",
      role: "Frontend",
      social: {
        github: "https://twitter.com/percy",
        linkedin: "https://linkedin.com/in/percy",
      },
    },
    {
      name: "Jesús",
      role: "Analista",
      social: {
        twitter: "https://twitter.com/jesus",
        linkedin: "https://linkedin.com/in/jesus",
      },
    },
    {
      name: "Valdi",
      role: "Analista",
      social: {
        twitter: "https://twitter.com/valdi",
        linkedin: "https://linkedin.com/in/valdi",
      },
    },
    {
      name: "Danny",
      role: "Backend",
      social: {
        twitter: "https://twitter.com/danny",
        linkedin: "https://linkedin.com/in/danny",
      },
    },
    {
      name: "Leodan",
      role: "FrontEnd",
      social: {
        twitter: "https://twitter.com/leodan",
        linkedin: "https://linkedin.com/in/leodan",
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
                  href={member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500"
                >
                  GitHub
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
