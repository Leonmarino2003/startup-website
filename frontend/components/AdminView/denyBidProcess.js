import styles from "./bidProcess.module.css";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import React, { useRef } from 'react';
import { updateBidStatuses, _getUser, deletePendingBidById } from "../../services/backendService";



const DenyBidProcess = ({data, showOverview}) => {
    const [selectedReason, setSelectedReason] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        updateSelectedReason(data);
    }, []);

    
    const updateSelectedReason = (data) => {
        if (data.bidStatuses?.adminRefuseMessage)
            setSelectedReason(data.bidStatuses.adminRefuseMessage);
    }
    


    const handleRadioChange = (event) => {
        const value = event.target.value;
        if (value === selectedReason){
            setSelectedReason('')
        } else {
            setSelectedReason(value)
        }
    };

    const handleUpdateStatuses = async () => {
        const updateData = {
          bidStatuses: {
            adminRefuseMessage:selectedReason,
          },
        };
        await updateBid(updateData);
    };
    
    const updateBid = async (updateData) => {
        try {
          const response = await updateBidStatuses(data._id, updateData);
          return response.data;
        } catch (error) {
          console.error(error);
        }
    };


    const handleDeny = async () => {
        const confirmation = window.confirm(
        "Are you sure you want to deny this bid? \n You will not be able to undo this!"
        );
        if (!confirmation) {
        return;
        }
        try {
          const result = await deletePendingBidById(data._id);
          //console.log(result);
        } catch (error) {
          console.error(error);
        }
    };
    

    const handleSubmit = () => {
        if (data.bidStatus != 5 ){
            handleDeny();
        }
        handleUpdateStatuses();
    };

    const CheckedImage = () => {
        return(
        <Image
        alt = "checked"
        width={22}
        height={22}
        src="/checked.png"
    />)};
    
    const UncheckedImage = () => {
        return(
        <Image
        alt = "unchecked"
        width={22}
        height={22}
        src="/unchecked.png"
    />)};
    
    /*useEffect(() => {
        console.log(currentData);
    }, [currentData]);*/


    return(
    <div>

        <div className={styles.headerBox}>
            <button 
                className={styles.alternativeStatusButton} 
                onClick={showOverview}> 
                <div className={styles.buttonText}> Overview </div>
            </button>
            <div className={styles.currentStatusFrame}>
                <div className={styles.buttonText}> Process </div> 
            </div>
        </div>
        
        <div className={styles.contentContainer}>
            <div className={styles.profile}>
                <h1>
                    <div className={styles.profilePicture}>
                        <Image
                        alt=""
                        src="/profilePic.svg"
                        intrinsic
                        width="200"
                        height="200"></Image>
                    </div>
                    <div>
                        <li className={styles.nameText}>
                            {"Name" /*get from database*/}
                        </li>
                        <li className={styles.profileText}>
                            {"Email"/*get from database*/}
                        </li>
                        <li className={styles.profileText}>
                            {"Phone number"/*get from database*/}
                        </li>
                        <li className={styles.profileText}>
                            {"Address"/*get from database*/}
                        </li>
                    </div>
                </h1>
            </div>
            <div>
                <div className={styles.titleText}> Fill in reasoning for denied bid </div>
                
                <div className={styles.denyReasonBox}>
                    <div className={styles.mailInputContainer}>
                        <div className={styles.text}>Message to : </div>
                        <input 
                            type="text" 
                            defaultValue="Default Value" 
                            ref={inputRef} 
                            className={styles.inputBar}
                        />{/* set default to user's email*/}
                    </div>

                    <div className={styles.radioButtonsContainer}>
                    <label>
                        <input
                        type="radio"
                        value="low offer"
                        checked={selectedReason === "low offer"}
                        onClick={handleRadioChange}
                        onChange={()=>null /*having only the onClick triggers a warning*/}
                        />
                        {selectedReason === "low offer" ? (
                        <CheckedImage/>) : (<UncheckedImage/>
                        )}
                        <div className={styles.text}>Low offer</div>
                    </label>
                    <label>
                        <input
                        type="radio"
                        value="spam offers"
                        checked={selectedReason === "spam offers"}
                        onClick={handleRadioChange}
                        onChange={()=>null}
                        />
                        {selectedReason === "spam offers" ? (
                        <CheckedImage/>) : (<UncheckedImage/>
                        )}
                        <div className={styles.text}>Spam offers</div>
                    </label>
                    <label>
                        <input
                        type="radio"
                        value="Requirements not met"
                        checked={selectedReason === "Requirements not met"}
                        onClick={handleRadioChange}
                        onChange={()=>null}
                        />
                        {selectedReason === "Requirements not met" ? (
                        <CheckedImage/>) : (<UncheckedImage/>
                        )}
                        <div className={styles.text}>Does not meet the requierments</div>
                    </label>
                    </div>
                    <button className={styles.blackButton} onClick={handleSubmit}>
                        <div className={styles.buttonText} style={{ color: "white" }}> Submit </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default DenyBidProcess;