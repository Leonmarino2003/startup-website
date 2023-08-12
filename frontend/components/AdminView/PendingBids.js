import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import styles from "./PendingBids.module.css"
import { useRouter } from "next/router";
import { updateUserId } from "../../redux/slices/adminUserPickSlice";
import { useDispatch } from "react-redux";
import { getUser, getUserBidRecords } from "../../services/backendService";
import classes from "./ShowAllBids.module.css";
import Image from "next/image";


const PendingBids = ({ data,
   statusMessage,
    setShowUserBids,
     setTargetId,
     }) => {

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
    router.push('/userOverview');
  };

    useEffect(() => {
      const getUserDataFromAPI = async () => {
        const userData = await getUser(data.user);
        return userData;
      }
    
      const getUserData = async () => {
        const getData = await getUserDataFromAPI(data.user);
        setUserData(getData)
      }
    
      getUserData().then(() => {
        console.log(userData);
      });
    
    }, [data.user]);

    const handleOneUser = (e) => {
      setShowUserBids(true)
      setShowProfilePopup(false)
      return setTargetId(e.target.value)
  }
  
    const getUserDataFromAPI= async () => {
      const userData = await getUserBidRecords(data.user);
      return userData;
    }
  
    const getUserData = async () => {
      const getData = await getUserDataFromAPI();
      setUserBids(getData)
    }
    const imageLoader = () => {
      return userData.profileImage;
    }
    const showFourFirstId = data.user.split("").splice(0,4).join("");
  
  const handleShowBidPage = (id) => {
    router.push(`/bid/${id}`);
  };


  return(
    <>

          <tr className={styles.rows}>
          <td title={`id: ${data._id}`}><div className={classes.PendingStatusBox} >{showFourFirstId}</div></td>
            <td> {userData?.name} </td>
            <td> {data.amount} </td>
            <td> {new Date(data.address.bidDate).toLocaleDateString()} </td>
            <td ><div className={classes.PendingStatusBox}> {statusMessage(data)}</div> </td>
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

          {showProfilePopup && 
           <div key={data.user}  className={`${"component-frame"} ${styles.popup}`}>
            <button className={styles.closeButton} onClick={() => {
              setShowProfilePopup(false);
            }}>X</button>
            <div className={styles.popupBlocks}>
            <div className={styles.popupContentLeft}> 
                  <div>{data.user}</div>
             <Image
              alt ="profileImage"
              loader={imageLoader}
                src={"/profileImage.png"}
               width={100}
                height={100} />
                  <div>{userData.name}</div>
                  <div>{userData.email}</div>
                  <div>{userData.phoneNumber}</div>
                  <div>{userData.address}</div>
             </div>
            <div className={styles.popupContentRight}> 
                 <div>Total bids: {userData.bids.length} </div>
                 <div>Bids in process: {userBids.pendingBids} </div>
                 <div>Won bids: {userBids.wonBids} </div>
                 <div>Denied bids: {userBids.deniedBids} </div>
                 <button onClick={handleClick}>Go to profilepage</button>
                 <button value={data.user} onClick={(e) => {handleOneUser(e)}}>Got to user bids</button>
              </div>
            </div>
            
            
           </div>} 
    </>
  )
}

export default PendingBids