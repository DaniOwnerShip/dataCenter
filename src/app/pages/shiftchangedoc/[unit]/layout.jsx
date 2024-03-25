
import UnitPlantButtons from "@/components/unitPlantButtons";
export const metadata = {
    title: 'ShiftChange',
}

export default function PlantUnitLayout({ children }) {


    return (
        <> 
        
            <div className="sideBarLeft">
                <div className="sidebarBox flex column" >
                    <UnitPlantButtons />
                </div>
            </div>

            <h1 className="flex center header">Cambio de Turno</h1>

            {children}

        </>


    );


}

