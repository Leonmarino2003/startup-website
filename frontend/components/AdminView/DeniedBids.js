import styles from "./DeniedBids.module.css"; 
import classes from "./PendingBids.module.css";
import showAllBids from "./ShowAllBids.module.css"
import { useEffect, useState } from "react";
import { getUser, getUserBidRecords } from "../../services/backendService";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { updateUserId } from "../../redux/slices/adminUserPickSlice";
import { useRouter } from "next/router";
import Image from "next/image";



const DeniedBids = ({ data, statusMessage }) => {

  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [userData, setUserData] = useState();
  const [userBids, setUserBids] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();

  const sendUserIdToState = () => {
    dispatch(updateUserId(data.user));
  };

  const handleClick = () => {
    sendUserIdToState(data.user);
    router.push("/userOverview");
  };

  useEffect(() => {
    const getUserDataFromAPI = async () => {
      const userData = await getUser(data.user);
      return userData;
    };
    getUserData().then(() => {
      console.log(userData);
    });
  }, [data.user]);
  
  const getUserDataFromAPI = async () => {
    const userData = await getUserBidRecords(data.user);
    return userData;
  };
    const getUserData = async () => {
      const getData = await getUserDataFromAPI();
      setUserBids(getData)
    }
    
    const imageLoader = () => {
    return userData?.profileImage;
  }
  
  const showFourFirstId = data.user.split("").splice(0,4).join("");

  const handleShowBidPage = (id) => {
    router.push(`/bid/${id}`);
  };


  return(
    <>

          <tr style={{padding:"1.5rem 1.5rem"}} className={classes.rows}>
          <td title={`id: ${data._id}`}><div className={showAllBids.DeniedStatusBox} >{showFourFirstId}</div></td>
            <td style={{padding:"1.0rem 1.0rem"}} > {userData?.name} </td>
            <td style={{padding:"1.5rem 1.5rem"}} > {data.amount} </td>
            <td style={{padding:"1.5rem 1.5rem"}} > {new Date(data.address.bidDate).toLocaleDateString()} </td>
            <td  style={{padding:"1.5rem 1.5rem"}} ><div className={showAllBids.DeniedStatusBox}>{statusMessage(data)} </div> </td>
            <td>
            <button className={styles.userViewButton} onClick={() => {
                handleShowBidPage(data._id);
                //setShowProfilePopup(true);
                //getUserData();
                }}
                  > <BsThreeDotsVertical className={styles.icon} />
              </button> 
              </td>
          </tr>


          {showProfilePopup && (
           <div key={data.user}  className={`${"component-frame"} ${styles.popup}`}>
            <button className={styles.closeButton} onClick={() => {
              setShowProfilePopup(false);
            }}>
            X
          </button>
          <div className={styles.popupBlocks}>
            <div className={styles.popupContentLeft}>
              <div>{data.user}</div>
              <Image
                alt="profileImage"
                loader={imageLoader}
                src={"/profileImage.png"}
                width={100}
                height={100}
              />
              <div>{userData?.name}</div>
              <div>{userData?.email}</div>
              <div>{userData?.phoneNumber}</div>
              <div>{userData?.address}</div>
            </div>
            <div className={styles.popupContentRight}>
              <div>Total bids: {userData?.bids?.length} </div>
              <div>Bids in process: {userBids?.pendingBids} </div>
              <div>Won bids: {userBids?.wonBids} </div>
              <div>Denied bids: {userBids?.deniedBids} </div>
              <button onClick={handleClick}>Go to profilepage</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeniedBids;
