import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const ProtectedRoute: React.FC<Props> = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default ProtectedRoute;
