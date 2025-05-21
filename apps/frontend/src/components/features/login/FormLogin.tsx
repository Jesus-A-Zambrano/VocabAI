import {useState} from "react";
import Input from "../../UI/input"
import Button from "../../UI/Button"


const FormLogin: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] =useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Email:", email);
        console.log("Password:", password);
    }
    
    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <Input 
            label="Correo electrónico"
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            showLink={false}
            />
            
            <Input
            label="Contraseña"
            type="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showLink={true}
            linkText="¿Olvidaste tu contraseña?"
            />
            
            <Button
            type="submit"
            fullWidth={true}
            >
                Iniciar sesión
            </Button>
        </form>
    )
    
}

export default FormLogin