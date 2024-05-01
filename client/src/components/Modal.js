import { useEffect} from "react";
import "./Modal.css";
const Modal=({setModalOpen,contract})=>{
    const Sharing=async()=>{
        const address=document.querySelector(".address").value;
        await contract.allow(address);
        console.log("Shared");
    };
    const Disallow = async () => {
        const address= document.querySelector(".address").value
        await contract.disallow(address);
        console.log("Disallowed");
      };
    useEffect(() => {
        const accessList = async () => {
          const addressList = await contract.shareAccess();
          let select = document.querySelector("#selectNumber");
          const options = addressList;
    
          for (let i = 0; i < options.length; i++) {
            let opt = options[i];
            let e1 = document.createElement("option");
            e1.textContent = opt;
            e1.value = opt;
            select.appendChild(e1);
          }
        };
        contract && accessList();
      }, [contract]);
    return (
    <>
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title ">Share with</div>
                <div className="body">
                    <input type="text" className="address" placeholder="Enter Address" />
                </div>
                <form id="myForm">
                    <select id="selectNumber">
                        <option className="address">People having access</option>
                    </select>
                </form>
                <div className="footer">
                    <button id="cancelBtn" className="btn btn-secondary" onClick={()=>{setModalOpen(false)}}>Cancle</button>
                    <button onClick={()=>Sharing()} className="btn btn-success">Share</button>
                    <button onClick={()=>Disallow()} className="disallow btn btn-danger">Disallow</button>
                </div>
            </div>
        </div>
    </>
    )
};
export default Modal;