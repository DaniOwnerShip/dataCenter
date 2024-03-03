"use client"

import React, { useState, useEffect, useRef} from 'react';
import { useRouter } from 'next/navigation';
import FileApi from "@/apis/fileApi";
import Area from "@/components/area";
import Loading from "@/components/loading"; 
import FileBar from "@/components/fileBar";

export default function PlantUnit({params}) {
 
  const unit = params.unit;  
  const [report, setReport] = useState();   
  const router = useRouter();
  const refToPDF = useRef(null);

 
  const fileName = `informe-${unit}-last.json`


  useEffect(() => {

    if (!report) {

      FileApi.downloadjson(fileName)
        .then(res => {
          setReport(res); 
        })
        .catch((e) => { window.alert(`❌ ${e.message}`); });
    }

  }, [report]);




  return (

    <>
      {report ? (

        <div className="mainContainer unit" ref={refToPDF}>

          {report[0].handshake.fileID.replace(/\.json$/, '')}




          <button type="button" className="button" onClick={() => router.push(`/pages/shiftChange/mainReport`)}>
            Main
          </button>



          <section className="areas-container">

            {report[1].areas.map((area, indexArea) => (
              <div key={`area-${indexArea}`} className="area">

                <Area place={unit} area={area} indexArea={indexArea} isMultimedia={false}/>

              </div>
            ))}

          </section>


          <FileBar report={report} setReport={setReport} place={unit} refToPDF={refToPDF} />

        </div>
      ) : (

        <Loading />

      )}



    </>

  );

}













// // "use client"

// // import { useRouter } from 'next/navigation'
 
// export default function Unit({params}) {
//   // const router = useRouter()
//   // const { id } = router.query
//   console.log('router:', params.unit);
//   const unit = params.unit;
//   // console.log('router:', id);
//   return <h2>Post: {unit}</h2>
// }


































// import React, { useState, useEffect} from 'react';
// import APIReport from "../../../apis/fileApi";
// import Area from "../../../components/areas";
// import Loading from "../../../components/loading";
// import FileBar from "../../../components/fileBar";
// import { useRouter } from 'next/router';



// export default function PlantUnit() {

//   const router = useRouter();
//   const { unit } = router.query;

//   const [report, setReport] = useState();

//   useEffect(() => {

//     if (!report) {

//       APIReport.downloadJson("informeU1-last.json")
//         .then(res => {
//           setReport(res);
//         })
//         .catch((e) => { window.alert(`❌ ${e.message}`); });
//     }

//   }, [report]);




//   return (

//     <>
//       {report ? (

//         <div className="mainContainer">
//           {unit}

//           <section className="areas-container">

//             {report[1].areas.map((area, indexArea) => (
//               <div key={`area-${indexArea}`} className="area">

//                 <Area area={area} indexArea={indexArea} />

//               </div>
//             ))}

//           </section>


//           <FileBar report={report} setReport={setReport} />


//         </div>
//       ) : (

//         <Loading />

//       )}



//     </>

//   );

// }
