
// import UnitPlantButtons from "@/components/unitPlantButtons";
// import FileDatePicker from "@/components/fileDatePicker"; 
// import FileButtons from "./fileButtons";


export const metadata = {
    title: 'Informe Termosol',
}

export default function SpotLayout({ children, params }) {
 
    console.log('params', params);     

    return (
        <> 
        
            {/* <div className="sideBarLeft">
                <div className="sidebarBox" >
                    <UnitPlantButtons spot={params.spot}/>
                    <FileDatePicker spot={params.spot}/>
                      <FileButtons spot={params.spot}/>  
                </div>
            </div> */}

            {/* <h1 className="flex center header">{params}</h1> */}

            {children}

        </>


    );


}

