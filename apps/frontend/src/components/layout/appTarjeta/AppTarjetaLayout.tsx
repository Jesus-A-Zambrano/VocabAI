import SideBar from "./Sidebar";

interface AppTarjetaProps {
    children: React.ReactNode
}

const AppTarjetaLayout: React.FC<AppTarjetaProps> = ({children}) => {
    return (
        <div className="flex ">
            <SideBar />
            {children}
        </div>
    )
}

export default AppTarjetaLayout;

