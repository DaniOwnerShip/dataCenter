import "@/styles/shiftChange.css"

export const metadata = {
    title: 'ShiftChange',
}

export default function PlantUnitLayout({ children, params }) {


    return (
        <div className="app">
            
            <h1 className="flex center header">{params.unit}</h1>

            {children}

        </div>


    );


}
