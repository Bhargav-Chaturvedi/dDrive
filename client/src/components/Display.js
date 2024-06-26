// import { useState } from "react";
// import './Display.css';
// const Display = (contract, account) => {
//     const [data, setData] = useState("");
//     const getData = async () => {
//         let dataArray;
//         const otherAddress = document.querySelector(".address").value;
//         if(otherAddress){
//             dataArray=await contract.display(otherAddress);
//             console.log(dataArray);
//         }else{
//             dataArray=await contract.display(account);
//         }
//         const isEmpty= Object.keys(dataArray).length===0;
//         if(!isEmpty){
//             const str= dataArray.toString();
//             const str_ary=str.split(",");
//             console.log(str_ary);
//         }
//     }
//     return (
//         <>
//             <div className="img-list">Image List</div>
//             <input type="text" placeholder="Enter address" className="address" />
//             <button className="center button" onClick={getData}>Get Data</button>
//         </>
//     )
// }
// export default Display;
import { useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
    const [data, setData] = useState("");
    const getdata = async () => {
        let dataArray;
        const Otheraddress = document.querySelector(".address").value;
        try {
            if (Otheraddress) {
                dataArray = await contract.display(Otheraddress);
                console.log(dataArray);
            } else {
                dataArray = await contract.display(account);
            }
        } catch (e) {
            alert("You don't have access");
        }
        const isEmpty = Object.keys(dataArray).length === 0;

        if (!isEmpty) {
            const str = dataArray.toString();
            const str_array = str.split(",");
            // console.log(str);
            console.log(str_array);
            const images = str_array.map((item, i) => {
                return (
                    <a href={item} key={i} target="_blank">
                        <img
                            key={i}
                            src={`https://gateway.pinata.cloud/ipfs/${item && item.split('/').pop()}`}
                            alt="Image Loading..."
                            className="image-list"
                        ></img>
                    </a>
                );
            });
            setData(images);
        } else {
            alert("No image to display");
        }
    };
    return (
        <>
            <div className="image-list">{data}</div>
            <input
                type="text"
                placeholder="Enter Address"
                className="address"
            ></input>
            <button className="center button" onClick={getdata}>
                Get Data
            </button>
        </>
    );
};
export default Display;