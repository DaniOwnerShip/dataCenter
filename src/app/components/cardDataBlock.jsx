export default function CardDataBlock({data}){
    console.log("data", data)
  
    return(
    <>
        <div className="container-headBlock">
                <h3>{data[0].name}</h3>
            </div>

            <div className="container-block">
                <div className="container-content">
                    <p>{data[1].desc}</p>
                </div>  
                <div className="boxChecker" >
                    <div>
                        <label>OK</label>
                        <input type="checkbox" />
                    </div>
                    <div>
                        <label>NOK</label>
                        <input type="checkbox" />
                    </div>
                </div> 
            <textarea className="textarea" placeholder="Escribe algo aquí"></textarea>  
            
            
            </div>
    </>
    );
}