import React from "react";
import styles from "./bidOverview.module.css";
import { useEffect, useState } from "react";
import { getUser, getUserBidRecords } from "../../services/backendService";
import { useDispatch, useSelector } from "react-redux";
//import translate from "../../languages/translate";
import Image from "next/image";


const BidOverview = ({data, dispatchDeny, dispatchAccept}) => {
  const [userData, setUserData] = useState({});
  const [showDotsMenu, setShowDotsMenu] = useState(false);
  

  useEffect(() => {
    const getUserDataFromAPI = async () => {
      const userData = await getUser(data.user);
      return userData;
    };

    const getUserData = async () => {
      const getData = await getUserDataFromAPI(data.user);
      setUserData(getData);
    };

    getUserData().then(() => {
      //console.log(userData);
    });
  }, [data.user]);

  const dispatchProcess = () => {
    if (data.bidStatus === 2)
      dispatchAccept();
    else if (data.bidStatus === 5)
      dispatchDeny();
  }



  return(
    
    <div>
      <div className={styles.headerBox}>
        <div className={styles.currentStatusFrame}> 
          <div className={styles.buttonText}> Overview </div>
        </div>
        <button className={styles.alternativeStatusButton} onClick={dispatchProcess}>
          <div className={styles.buttonText}> Process </div> 
        </button>
      </div>
      <div className={styles.contentFrame}>

      <div>
        <div className={styles.columnFrame}>
        <div className={styles.pairFrame}>
          <div className={styles.titleText}> Full name</div>
          <div className={styles.dataText}> {userData.name??"User not found"} </div>
        </div>
        <div className={styles.pairFrame}>
          <div className={styles.titleText}> Address</div>
          <div className={styles.dataText}> {userData.address??"User not found"}</div>
        </div>
        <div className={styles.pairFrame}>
          <div className={styles.titleText}> Phone number</div>
          <div className={styles.dataText}> {userData.phoneNumber??"User not found"}</div>
        </div>
        <div className={styles.pairFrame}>
          <div className={styles.titleText}> E-mail</div>
          <div className={styles.dataText}> {userData.email??"User not found"}</div>
        </div>
        </div>
        {(data.bidStatus === 2 && (
          <>
          <div className={styles.bidAcceptedText}> Bid accepted by Ploteye </div>
            <Image 
            alt="accepted"
            style={{ display: 'block', margin: '0 auto', marginTop: "23px" }}
            width={156}
            height={156}
            src="/BidAccepted.png"
            />
            </>
        ))}
        {(data.bidStatus === 5 && (
          <>
          <div className={styles.bidAcceptedText}> Bid denied by Ploteye </div>
            <Image 
            alt="denied"
            style={{ display: 'block', margin: '0 auto', marginTop: "23px" }}
            width={156}
            height={156}
            src="/BidDenied.png"
            />
            </>
        ))}
      </div>
      <div className={styles.columnFrame}>
        <div className={styles.pairFrame}>
          <div className={styles.titleText}> Account date</div>
          <div className={styles.dataText}> {new Date(userData.accountCreationDate).toLocaleDateString()??"User not found"}</div>
        </div>
        <div className={styles.pairFrame}>
          <div className={styles.titleText}> User ID</div>
          <div className={styles.dataText}> {userData._id??"User not found"}</div>
        </div>
        <div className={styles.pairFrame}>
          <div className={styles.titleText}> Bid address</div>
          <div className={styles.dataText}> {data.address?.street??"Bid not found"} {", "} {data.address?.city??""} {", "} {data.address?.country??""} </div>
        </div>
        <div className={styles.pairFrame}>
          <div className={styles.titleText}> Street code</div>
          <div className={styles.dataText}> Placeholder</div>
        </div>
        <div className={styles.pairFrame}>
          <div className={styles.titleText}> Bid amount</div>
          <div className={styles.dataText}> {data.amount??"Bid not found"} </div>
        </div>
      </div>

      <div className={styles.dotsButtonArea}>
        <button className={styles.dotsButton} onClick={ () => {
          setShowDotsMenu(true);
        }}> 
          <Image
            alt="threeDots"
            width={15}
            height={55}
            src="/BigThreeDots.png"
          />
        </button>
        {showDotsMenu && <div className={styles.dotsButtonMenu}>
          <button className={styles.innerDotsButton} onClick={ () => {
            setShowDotsMenu(false);
          }}> 
            <Image
            width={15}
            height={55}
            alt="threeDots"
            src="/BigThreeDots.png"
          />
          </button> 
          <button className={styles.dotsMenuButton}> 
            Ban user
          </button>
          <button className={styles.dotsMenuButton}> 
            Warn user
          </button>
          <button className={styles.dotsMenuButton}> 
            Message user
          </button>
          <button className={styles.dotsMenuButton}> 
            Suspend user
          </button>
        </div>}
      </div>
      
      {(data.bidStatus === 1 && (
      <button className={styles.acceptButton} onClick={dispatchAccept}> 
        <div className={styles.buttonText}> Accept </div> 
      </button>
      ))}
      {(data.bidStatus === 1 && (
      <button className={styles.denyButton} onClick={dispatchDeny}> 
        <div className={styles.buttonText} style={{ color: "white" }}> Deny </div>
      </button>
      ))}

      </div>
    </div>
  );
}


export default BidOverview;

