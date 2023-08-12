import styles from "./ShowUsers.module.css";
import classes from "./ShowAllBids.module.css";
import adminStyles from "../../pages/adminDashboard/adminDashboard.module.css";
import improvedRow from "./PendingBids.module.css";
import ShowBidRecords from "./ShowBidRecords";
import { FaSort } from "react-icons/fa";
import { useState, useEffect } from "react";
import {
  _getUser,
  getUserBidRecords,
  getAllBids,
} from "../../services/backendService";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateUserId } from "../../redux/slices/adminUserPickSlice";
import { useRouter } from "next/router";
import Image from "next/image";
import languagesJson from "../../languages.json";

const ShowUsers = ({ data, setShowUserBids, setTargetId }) => {
  const [bidsFromUsersData, setBidsFromUsersData] = useState({});
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  const dispatch = useDispatch();
  const router = useRouter();

  const sendUserIdToState = () => {
    dispatch(updateUserId(data._id));
  };

  const getUserDataFromAPI = async () => {
    const userData = await getUserBidRecords(data._id);
    return userData;
  };

  const getUserData = async () => {
    const getData = await getUserDataFromAPI();
    setUserBidRecordsData(getData);
  };

  const renderBids = async () => {
    let bidsData = await getAllBids(data._id);
    const usersBidsData = bidsData.msg.filter((bids) => bids.user === data._id);
    setBidsFromUsersData(usersBidsData);
    console.log("bids data", usersBidsData);
  };

  const handleClick = () => {
    sendUserIdToState();
    router.push("/userOverview");
  };

  const showFourFirstId = data._id.split("").splice(0, 4).join(""); //split up id to show first 4. to see full details hover over the id

  const handleStatus = () => {
    // shows current bid status with color where id is set.

    if (data?.documents[0]?.status === "Pending") {
      return classes.PendingStatusBox;
    } else if (data?.documents[0]?.status === "Accepted") {
      return classes.AcceptedStatusBox;
    } else if (data?.documents[0]?.status === "Denied") {
      return classes.DeniedStatusBox;
    } else if (data?.role === "banned") {
      return styles.bannedStatusBox;
    } else {
      //currently those no documented statuses and won statuses use the same css. Will be changed in the future
      return classes.WonStatusBox;
    }
  };

  const imageLoader = () => {
    return data.profileImage;
  };
  const handleOneUser = (e) => {
    setShowUserBids(true);
    setShowProfilePopup(false);
    sendUserIdToState();
    return setTargetId(e.target.value);
  };
  // This function is for handling users that havent chosen a profile image
  const handleUserProfileImages = () => {
    if (data.profileImage !== undefined) {
      return (
        <>
          <Image
            loader={imageLoader}
            alt="profileImage"
            src={"/profilePic.svg"}
            width={100}
            height={100}
          />
        </>
      );
    } else {//If user has no profile image they get the standard one without the loader
      return (
        <>
          <Image
            alt="profileImage"
            src={"/profilePic.svg"}
            width={100}
            height={100}
          />
        </>
      );
    }
  };

  const [userBidRecordsData, setUserBidRecordsData] = useState({});
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  return (
    <>
      <tr className={`${styles.tableRow} ${improvedRow.rows}`}>
        <td title={`id: ${data._id}`}>
          <div
            style={{ maxWidth: "60px" }}
            className={handleStatus()}>
            {showFourFirstId}
          </div>
        </td>
        <td style={{ fontSize: "0.8rem" }}>{data.name}</td>
        <td style={{ padding: "0rem 0rem" }}>{data.email}</td>
        <td>{data.phoneNumber}</td>
        <td>{data.address} </td>
        <td>{new Date(data.accountCreationDate).toLocaleDateString()}</td>

        <button
          className={styles.userViewButton}
          onClick={() => {
            setShowProfilePopup(true), getUserData();
          }}>
          {" "}
          <BsThreeDotsVertical className={styles.icon} />
        </button>
      </tr>

      {showProfilePopup && (
        <div
          key={data._id}
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
              <td
                style={{ float: "right", marginLeft: "150px" }}
                title={`id: ${data._id}`}>
                <div className={handleStatus()}>{showFourFirstId}</div>
              </td>
              {handleUserProfileImages()}
              <div>{data.name}</div>
              <div>{data.email}</div>
              <div>{data.phoneNumber}</div>
              <div>{data.address}</div>
            </div>
            <div className={styles.popupContentRight}>
              <div>
                {translations.TotalBids}: {data.bids.length}
              </div>
              <div>
                {translations.OngoingBids}: {userBidRecordsData.pendingBids}{" "}
              </div>
              <div>
                {translations.BidsWon}: {userBidRecordsData.wonBids}{" "}
              </div>
              <div>
                {" "}
                {translations.DeniedBids} {userBidRecordsData.deniedBids}{" "}
              </div>
              <button onClick={handleClick}>Go to Profile</button>
              <button
                value={data._id}
                onClick={(e) => {
                  handleOneUser(e);
                  renderBids();
                }}>
                Go to user bids
              </button>
            </div>
          </div>
        </div>
      )}
      {bidsFromUsersData?.length > 0 ? (
        <>
          <br></br>
          <tr className={`${adminStyles.tableHead}`}>
            <th>
              Bid Amount <FaSort />
            </th>
            <th>
              Date <FaSort />
            </th>
            <th>
              Status <FaSort />
            </th>
          </tr>
          {bidsFromUsersData.length > 0 &&
            bidsFromUsersData.map((bid, index) => (
              <ShowBidRecords
                key={bid._id ? bid._id : index}
                data={bid}
              />
            ))}
        </>
      ) : null}
    </>
  );
};

export default ShowUsers;
