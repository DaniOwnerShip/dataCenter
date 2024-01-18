import { useState } from 'react';

export default function ItemSimple({ data }) {

    // console.log("CardDataBlock");
    const checkb = [false, false];
    const [checkbStates, setCheckbStates] = useState(checkb);
    const [comments, SetComments] = useState('');

    const handleCheckboxChange = (index) => {
        setCheckbStates((prevStates) => {
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
                    {checkbStates.map((checked, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleCheckboxChange(index)}
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