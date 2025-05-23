import { useState, useEffect } from "react";

export function useUsuarioTest() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [nombre, setNombre] = useState<string | null>(null);
  const [apellido, setApellido] = useState<string | null>(null);
  const [imagen, setImagen] = useState<string>("");

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setIsLoaded(true);
      setIsSignedIn(true);
      setNombre("Leodan");
      setApellido("Valda");
      setImagen(""); 
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return {
    isLoaded,
    isSignedIn,
    nombre,
    apellido,
    imagen,
  };
}