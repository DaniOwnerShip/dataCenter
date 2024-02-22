"use client"
import "../../../styles/shiftChange.css"
import "../../../styles/scrollbar.css"
// import { GlobalProvider, useGlobalContext  } from '../../../GlobalContext';
import { useGlobalContext } from '../../../GlobalContext';
     
// export const metadata = {
//     title: 'ShiftChange',
// }
 
export default function ShiftChangeLayout({ children }) {
    
    const { globalDocIsBlock, setGlobalDocIsBlock } = useGlobalContext();
      console.log('globalDocIsBlock:', globalDocIsBlock ); 
    //    const { globalDocIsBlock, setGlobalDocIsBlock } = useGlobalContext  ;
    // console.log('useGlobalContextx:' ); 
    // console.log('useGlobalContext:', typeof(useGlobalContext)); 
    // console.log('useGlobalContext:', {...useGlobalContext}); 
    //  console.log('useGlobalContext:', useGlobalContext.globalDocIsBlock);  {globalDocIsBlock? 'aa': 'bb'}
    // Accede a las propiedades de los hijos
    // React.Children.forEach(children, child => {
    //     console.log(child.props ); // Esto imprimirá las propiedades de cada hijo
    // });
    return (
        < >
            <h1>Cambio de Turno{globalDocIsBlock === 'enabled'? '🔓' : '🔒'}</h1>

            {children}

        </ >


    );


}

