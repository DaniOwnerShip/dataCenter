import "../../../../styles/shiftChange.css"

export const metadata = {
    title: 'ShiftChange',
}

export default function PlantUnitLayout({ children, params }) {


    return (
        <>
            <h1>{params.unit}</h1>

            {children}

        </>


    );


}

