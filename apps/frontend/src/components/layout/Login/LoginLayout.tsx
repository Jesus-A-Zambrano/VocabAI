import { SignIn } from "@clerk/clerk-react";

const LoginLayout = () => {
  return <SignIn afterSignInUrl={"/app"} />;
};

export default LoginLayout;
