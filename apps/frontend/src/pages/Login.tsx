import React from "react";
import FormLogin from "../components/features/login/FormLogin";
import LoginLayout from "../components/layout/Login/LoginLayout";


const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fff6f2]">
            <LoginLayout>
                <FormLogin />
            </LoginLayout>
        </div>
    );
};

export default LoginPage;
