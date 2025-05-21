import Input from "../../UI/input";
                    
interface ViewCuentaProps {
    name: string;
    setName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
}
                    
const ViewCuenta: React.FC<ViewCuentaProps> = ({name, setName, email, setEmail, password, setPassword}) => {
    return(
        <div>
            <Input
            label="Nombre"
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <Input
            label="Correo electrónico"
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <Input
            label="Contraseña"
            type="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    )
}                  

export default ViewCuenta;
                    
                    