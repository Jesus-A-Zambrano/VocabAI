import AppTarjetaLayout from "../components/layout/appTarjeta/AppTarjetaLayout";
import PracticaDashboard from "../components/features/appTarjeta/PracticaDashboard";



const AppTarjeta: React.FC = () => {
    return (
        <AppTarjetaLayout>
            <PracticaDashboard></PracticaDashboard>
        </AppTarjetaLayout>
    )
}

export default AppTarjeta;