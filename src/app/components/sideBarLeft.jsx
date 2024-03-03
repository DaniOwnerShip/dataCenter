

import UnitPlantButtons from "./unitPlantButtons";
// import ShocketInterface from "./shocketInterface"; 


export default function SideBarLeft({ fileID }) {


    return (

        <div className="sideBar" > 
            <UnitPlantButtons />  
            {/* <ShocketInterface  fileID={fileID}/>    */}
        </div >

    )
}