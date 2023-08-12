import styles from "./AcceptedBids.module.css";
import classes from "./PendingBids.module.css";
import allBidsStyles from "./ShowAllBids.module.css";
import { useEffect, useState } from "react";
import { _getUser, getUser } from "../../services/backendService";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { updateUserId } from "../../redux/slices/adminUserPickSlice";
import { useRouter } from "next/router";
import Image from "next/image";


const AcceptedBids = ({ data, statusMessage }) => {

  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const [userData, setUserData] = useState();

  const dispatch = useDispatch();
  const router = useRouter();

  const sendUserIdToState = () => {
    dispatch(updateUserId(data.user));
  };

  useEffect(() => {
    const getUserDataFromAPI = async () => {
      const userData = await getUser(data.user);
      return userData;
    };

    const getUserData = async () => {
      const getData = await getUserDataFromAPI();
      setUserData(getData);
    };

    getUserData();

    console.log(userData);
  }, [data.user]);

  const handleClick = () => {
    sendUserIdToState();
    router.push("/userOverview");
  };
  const showFourFirstId = data.user.split("").splice(0,4).join("");
  const imageLoader = () => {
    return userData.profileImage;
  }

  const handleShowBidPage = (id) => {
    router.push(`/bid/${id}`);
  };

  return (
    <>
      <tr className={classes.rows}>
                        
      <td title={`id: ${data._id}`}><div className={allBidsStyles.AcceptedStatusBox} >{showFourFirstId}</div></td>
        <td>{userData && userData.name}</td>
        <td>{data.amount}</td>
        <td>{new Date(data.address.bidDate).toLocaleDateString()}</td>
        <td ><div className={allBidsStyles.AcceptedStatusBox}>{statusMessage(data)}</div>
        </td>
        <td>
          <button className={styles.userViewButton} onClick={() => {
            handleShowBidPage(data._id);
            //setShowProfilePopup(true);
            }}
          > <BsThreeDotsVertical className={styles.icon} />
          </button>
        </td>
      </tr>

      {showProfilePopup && (
        <div
          key={data.user}
          className={`${"component-frame"} ${styles.popup}`}>
          <button
            className={styles.closeButton}
            onClick={() => {
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
              <div>{userData.name}</div>
              <div>{userData.email}</div>
              <div>{userData.phoneNumber}</div>
              <div>{userData.address}</div>
            </div>
            <div className={styles.popupContentRight}>
              <div>Total bids: </div>
              <div>Bids in process: </div>
              <div>Won bids: </div>
              <div>Denied bids: </div>
              <button onClick={handleClick}>Go to profilepage</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AcceptedBids;
