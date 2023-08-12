import styles from "./bidProcess.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import React, { useRef } from 'react';
import { updateBidStatuses, _getUser, confirmPendingBidById } from "../../services/backendService";



const AcceptBidProcess = ({data, showOverview}) => {
    const [processStep, setProcessStep] = useState(0);
    const textAreaRefs = useRef([]);
    const [adminView, setAdminview] = useState(true);
    const [ownerAccept, setOwnerAccept] = useState(true);


    useEffect(() => {
        updateInputData(data);
    }, []);


    const updateInputData = (data) => {
    if (data.bidStatuses) {
        const { bidStatuses } = data;
    
        let updatedProcessStep = 0;
    
        // Process Started
        if (bidStatuses.processStarted) {
        const { checkBox } = bidStatuses.processStarted;
        updatedProcessStep = checkBox ? 1 : 0;
        textAreaRefs.current[1].value = bidStatuses.processStarted.message ?? '';
        }
    
        // Contact Owner
        if (bidStatuses.contactOwner) {
        const { checkBox, presented, ownerReply } = bidStatuses.contactOwner;
        if (checkBox) updatedProcessStep = 2;
        textAreaRefs.current[2].value = bidStatuses.contactOwner.message ?? '';
    
        // Presented
        if (presented) {
            if (presented.checkBox) updatedProcessStep = 3;
            textAreaRefs.current[3].value = presented.message ?? '';
        }
    
        // Owner Reply
        if (ownerReply) {
            if (ownerReply.checkBox) updatedProcessStep = 4;
            setOwnerAccept(ownerReply.accept ?? true);
            textAreaRefs.current[4].value = ownerReply.message ?? '';
        }
        }
    
        // Close Process
        if (bidStatuses.closeProcess) {
        if (bidStatuses.closeProcess.checkBox) updatedProcessStep = 5;
        textAreaRefs.current[5].value = bidStatuses.closeProcess.message ?? '';
        }
    
        setProcessStep(updatedProcessStep);
    }
    };



    const toggleAdminview = () => {
        setAdminview(!adminView);
    }

    const handleRadioChange = (event) => {
        let value = parseInt(event.target.value);
        //console.log(value, processStep);
        if (value === 4){
            if (processStep === value-1){
                setOwnerAccept(true);
                setProcessStep(value);
                return;
            }
            if (processStep === value && !ownerAccept){
                setOwnerAccept(true);
                return;
            }
            if (processStep === value && ownerAccept){
                setProcessStep(value-1);
                return;
            }
        }

        if (value < 0){
            value = -value;
            if (processStep === value-1){
                setOwnerAccept(false);
                setProcessStep(value);
                return;
            }
            if (processStep === value && ownerAccept){
                setOwnerAccept(false);
                return;
            }
            if (processStep === value && !ownerAccept){
                setProcessStep(value-1);
                return;
            }
        }  

        if (processStep === value) {
            setProcessStep(value-1);            
        } else if (processStep === value -1){
            setProcessStep(value);
        }
      };

    const CheckedImage = () => {
        return(
        <Image
        width={22}
        height={22}
        src="/checked.png"
        alt="checked icon"
        />)};
        
    const UncheckedImage = () => {
    return(
        <Image
        width={22}
        height={22}
        src="/unchecked.png"
        alt="unchecked icon"
        />)};


    const handleUpdateStatuses = async () => {
        const updateData = {
            bidStatuses: {
                processStarted: {
                    checkBox: (processStep >= 1),
                    message: textAreaRefs.current[1].value
                  },
              
                  contactOwner: {
                    checkBox: (processStep >= 2),
                    message: textAreaRefs.current[2].value,
              
                    presented: {
                        checkBox: (processStep >= 3),
                        message: textAreaRefs.current[3].value
                    },
                    
                    ownerReply: {
                        checkBox: (processStep >= 4),
                        accept: ownerAccept,
                        message: textAreaRefs.current[4].value
                    },
                  },
              
                  closeProcess: {
                    checkBox: (processStep >= 5),
                    message: textAreaRefs.current[5].value
                  },  
              
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

    const handleAccept = async (id) => {
        const confirmation = window.confirm(
          "Are you sure you want to confirm this bid? \n You will not be able to undo this!"
        );
        if (!confirmation) {
          return;
        }
        try {
          const result = await confirmPendingBidById(id);
          //console.log(result);
        } catch (error) {
          console.error(error);
        }
    };

    const handleSubmit = async (id) => {
        if (data.bidStatus != 2){
            handleAccept(id);
        }
        await handleUpdateStatuses();
    };






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
                <div className={styles.viewButtonContainer}>
                <button 
                onClick={toggleAdminview} 
                className={styles.viewButton}
                style={{background: adminView? '#4CAD61' : 'none'}}
                > 
                    Admin View
                </button>
                <button 
                onClick={toggleAdminview} 
                className={styles.viewButton}
                style={{background: adminView? 'none' : '#40949D'}}
                > 
                    User View
                </button>
                </div>
                {adminView &&
                <div className={styles.adminViewBox}>
                    <div className={styles.adminViewHeader}>
                        <div className={styles.buttonText}> Process </div> 
                    </div>
                    <div className={styles.buttonTextPair}>
                    <label>
                        <input
                        type="radio"
                        value="1"
                        checked={processStep >= 1}
                        onClick={handleRadioChange}
                        onChange={()=>null /*having only the onClick triggers a warning*/}
                        />
                        {processStep >=1 ? (<CheckedImage/>) : (<UncheckedImage/> )}
                        <div className={styles.text}>Process started</div>
                    </label>
                    <textarea 
                        className={styles.textInput} 
                        ref={(ref) => (textAreaRefs.current[1] = ref)}
                    />
                    </div>
                    <div className={styles.buttonTextPair}>
                    <label>
                        <input
                        type="radio"
                        value="2"
                        checked={processStep >= 2}
                        onClick={handleRadioChange}
                        onChange={()=>null /*having only the onClick triggers a warning*/}
                        />
                        {processStep >=2 ? (<CheckedImage/>) : (<UncheckedImage/> )}
                        <div className={styles.text}>Owner reached</div>
                    </label>
                    <textarea 
                        className={styles.textInput} 
                        ref={(ref) => (textAreaRefs.current[2] = ref)}
                    />
                    </div>
                    {/*<div className={styles.buttonTextPair}>
                    <label>
                        <input
                        type="radio"
                        value="3"
                        checked={processStep >= 3}
                        onClick={handleRadioChange}
                        />
                        {processStep >=3 ? (<CheckedImage/>) : (<UncheckedImage/> )}
                        <div className={styles.text}>Explain where we are</div>
                    </label>
                    <textarea 
                        className={styles.textInput} 
                        ref={(ref) => (textAreaRefs.current[3] = ref)}
                    />
                    </div>*/}
                    <div className={styles.buttonTextPair}>
                    <label>
                        <input
                        type="radio"
                        value="3"
                        checked={processStep >= 3}
                        onClick={handleRadioChange}
                        onChange={()=>null /*having only the onClick triggers a warning*/}
                        />
                        {processStep >=3 ? (<CheckedImage/>) : (<UncheckedImage/> )}
                        <div className={styles.text}>Bid presented to Owner</div>
                    </label>
                    <textarea 
                        className={styles.textInput} 
                        ref={(ref) => (textAreaRefs.current[3] = ref)}
                    />
                    </div>
                    <div className={styles.buttonTextPair}>
                        <div className={styles.buttonPairContainer}>
                            <label>
                                <input
                                type="radio"
                                value="4"
                                checked={processStep >= 4 && ownerAccept}
                                onClick={handleRadioChange}
                                onChange={()=>null /*having only the onClick triggers a warning*/}
                                />
                                {(processStep>=4 && ownerAccept) ? (<CheckedImage/>) : (<UncheckedImage/> )}
                                <div className={styles.smallText}>Owner accepted</div>
                            </label>
                            <label>
                                <input
                                type="radio"
                                value="-4"
                                checked={processStep >= 4 && !ownerAccept}
                                onClick={handleRadioChange}
                                onChange={()=>null /*having only the onClick triggers a warning*/}
                                />
                                {(processStep>=4 && !ownerAccept) ? (<CheckedImage/>) : (<UncheckedImage/> )}
                                <div className={styles.smallText}>Owner denied</div>
                            </label>
                        </div>
                        <textarea 
                            className={styles.textInput} 
                            ref={(ref) => (textAreaRefs.current[4] = ref)}
                        />
                    </div>
                    <div className={styles.buttonTextPair}>
                    <label>
                        <input
                        type="radio"
                        value="5"
                        checked={processStep == 5}
                        onClick={handleRadioChange}
                        onChange={()=>null /*having only the onClick triggers a warning*/}
                        />
                        {processStep >=5 ? (<CheckedImage/>) : (<UncheckedImage/> )}
                        <div className={styles.text}>Close this bid process</div>
                    </label>
                    <textarea 
                        className={styles.textInput} 
                        ref={(ref) => (textAreaRefs.current[5] = ref)}
                    />
                    </div>
                    <button className={styles.greenButton} onClick={ () =>{ handleSubmit(data._id)}}>
                        <div className={styles.buttonText}>Update</div>
                    </button>
                </div>
                }
                {!adminView && 
                <div className={styles.userViewBox}>
                    <div className={styles.userViewHeader}>
                        <div className={styles.buttonText}> Process </div> 
                    </div>
                    <div className={styles.progressCheckContainer}>
                        <Image
                            style={{ top: '0px', position: 'absolute', left: '0px', zIndex: '2' }}
                            width={66}
                            height={66}
                            src={processStep >= 1 ? "/BidAccepted.png" : "/inProgressCircle.png"}
                        />
                        <div
                            className={styles.textOnImage}
                            style={{ top: '14px', left: '80px', position: 'absolute'}}
                        >
                            Bid Accepted by Ploteye
                        </div>

                        <div
                            className={styles.connectingLine}
                            style={{ top: '55px', background: processStep >= 2 ? '#4CAD61' : '#B9DFC1' }}
                        />
                        <Image
                            style={{ top: '130px', position: 'absolute', left: '0px', zIndex: '2' }}
                            width={66}
                            height={66}
                            src={processStep >= 2 ? "/BidAccepted.png" : "/inProgressCircle.png"}
                        />
                        <div
                            className={styles.textOnImage}
                            style={{ top: '144px', left: '80px', position: 'absolute'}}
                        >
                            Owner reached
                        </div>

                        <div
                            className={styles.connectingLine}
                            style={{ top: '185px', background: processStep >= 4 ? '#4CAD61' : '#B9DFC1' }}
                        />
                        <Image
                            style={{ top: '260px', position: 'absolute', left: '0px', zIndex: '2' }}
                            width={66}
                            height={66}
                            src={processStep >= 4 ? "/BidAccepted.png" : "/inProgressCircle.png"}
                        />
                        <div
                            className={styles.textOnImage}
                            style={{ top: '274px', left: '80px', position: 'absolute'}}
                        >
                            Bid presented to Owner
                        </div>

                        <div
                            className={styles.connectingLine}
                            style={{ top: '315px', background: processStep >= 4 ? '#4CAD61' : '#B9DFC1' }}
                        />
                        <Image
                            style={{ top: '390px', position: 'absolute', left: '0px', zIndex: '2' }}
                            width={66}
                            height={66}
                            src={processStep >= 4 ? "/BidAccepted.png" : "/inProgressCircle.png"}
                        />
                        <div
                            className={styles.textOnImage}
                            style={{ top: '404px', left: '80px', position: 'absolute'}}
                        >
                            Offer in review
                        </div>

                        <div
                            className={styles.connectingLine}
                            style={{ top: '445px', background: processStep >= 5 ? '#4CAD61' : '#B9DFC1' }}
                        />
                        <Image
                            style={{ top: '520px', position: 'absolute', left: '0px', zIndex: '2' }}
                            width={66}
                            height={66}
                            src={processStep >= 5 ? "/BidAccepted.png" : "/inProgressCircle.png"}
                        />
                        <div
                            className={styles.textOnImage}
                            style={{ top: '534px', left: '80px', position: 'absolute'}}
                        >
                            Accepted or denied by the Owner
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    </div>
    )
}

export default AcceptBidProcess;