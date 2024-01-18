 
import ItemDouble from "./itemDouble";


export default function CardDouble({ data }) {

    console.log("CardDouble", data ) ;

 
   return (
       <>
           <div className="container-headBlock-double">
               <h3 className="text">{data[0].name}</h3>
               <h4 className="unit">PTE1 | PTE2</h4> 

           </div> 

           {/* <div >
               <h4>sdf</h4>
           </div>  */}
 
           <ItemDouble data={data[1]} /> 
           <ItemDouble data={data[2]} /> 
           <ItemDouble data={data[3]} /> 
           <ItemDouble data={data[4]} /> 
           <ItemDouble data={data[5]} /> 
           <ItemDouble data={data[6]} /> 
           <ItemDouble data={data[7]} /> 
           <ItemDouble data={data[8]} /> 
 
       </>
   );
}