import { useUser } from "@clerk/clerk-react";

export function useUsuario() {
  const { user, isLoaded, isSignedIn } = useUser();

  return {
    isLoaded,
    isSignedIn,
    user,
    id: user?.id,
    email: user?.primaryEmailAddress?.emailAddress,
    nombre: user?.firstName,
    apellido: user?.lastName,
    imagen: user?.imageUrl,
  };
}