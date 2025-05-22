import { SignIn } from "@clerk/clerk-react";

const LoginLayout = () => {
  return <SignIn forceRedirectUrl={"/app"} />;
};

export default LoginLayout;
