 import ItemSimple from "./itemSimple";  

export default function CardSimple({ data }) {

    console.log("CardSimple", data) 

    return (
        <>
            <div className="container-headBlock">
                <h3>{data[0].name}</h3>
            </div> 

            <ItemSimple data={data[1]} /> 
            <ItemSimple data={data[2]} /> 
            <ItemSimple data={data[3]} /> 
            <ItemSimple data={data[4]} /> 
            <ItemSimple data={data[5]} />  

        </>
    );
}