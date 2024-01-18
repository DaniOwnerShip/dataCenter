import { useState } from 'react';

export default function ItemDouble({ data }) {

    // console.log("CardDataBlock");
    const checkb1 = [false, false];
    const [checkbStates1, setCheckbStates1] = useState(checkb1);
    const checkb2 = [false, false];
    const [checkbStates2, setCheckbStates2] = useState(checkb2);
    const [comments, SetComments] = useState('');

    const handleCheckboxChange = (index, item) => {
        const setter = item? setCheckbStates1: setCheckbStates2
        setter((prevStates) => {
            const newStates = [...prevStates];
            if (index % 2 === 0) {
                newStates[index] = true;
                newStates[index + 1] = false;
                data.oknok = true;
            }
            else {
                newStates[index] = true;
                newStates[index - 1] = false;
                data.oknok = false;
            }
            return newStates;
        });
    };

    const handleChange = (event) => {
        SetComments(event.target.value); 
        data.coments = comments;
        // console.log("Ca ", comments)
    };



    return (
        <>
            <div className="container-block">
                <div className="container-content">
                    <p>{data.desc}</p>
                </div>

                <div className="boxChecker" >
                    {checkbStates1.map((checked, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleCheckboxChange(index, true)}
                            />
                            {`${index % 2 === 0 ? 'OK' : 'NOK'}`}
                        </label>
                    ))}
                </div>               
                
                 <div className="boxChecker" >
                    {checkbStates2.map((checked, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleCheckboxChange(index, false)}
                            />
                            {`${index % 2 === 0 ? 'OK' : 'NOK'}`}
                        </label>
                    ))}
                </div>
                 
                <textarea
                    className="textarea"
                    placeholder="introduce un comentario"
                    value={comments}
                    onChange={handleChange}
                ></textarea>
            </div>
        </>
    );
}