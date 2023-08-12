import styles from "./userOverview.module.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { getUser, banUser, getUserBids } from "../../services/backendService";
import { FaEllipsisV } from "react-icons/fa";

const UserOverview = () => {
  const showUserId = useSelector((state) => state.userAdminPick.userId);
  const [userData, setUserData] = useState();
  const [showUserData, setShowUserData] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showBanForm, setShowBanForm] = useState(false);
  const [user, setUser] = useState("");
  const [userBids, setUserBids] = useState({});

  const dropdownRef = useRef(null);

  useEffect(() => {
    const getUserDataFromAPI = async (userId) => {
      const userData = await getUser(userId);
      return userData;
    };

    const getUserData = async () => {
      const getData = await getUserDataFromAPI(showUserId);
      setUserData(getData);
      console.log("användardata:", userData);
    };

    getUserData();
  }, [showUserId]);

  useEffect(() => {
    const getUserBidsDataFromAPI = async () => {
      const userBidsData = await getUserBids(showUserId);
      return userBidsData;
    };

    const getUserBidsData = async () => {
      const bidsData = await getUserBidsDataFromAPI();
      setUserBids(bidsData);
      console.log("userBidsData:", bidsData);
    };

    getUserBidsData();
  }, [showUserId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleBanClick = () => {
    setShowUserData(false);
    setShowBanForm(true);
    setUser(showUserId);
    console.log("User banned");
  };

  const handleWarnClick = () => {
    console.log("User warned");
  };

  const banUserByUserId = async (user, message) => {
    try {
      const banResult = await banUser(user, message);
      if (!banResult.success) {
        alert("An error occurred while banning user");
      } else {
        alert("User banned successfully!");
      }
    } catch (error) {
      console.error("error");
      alert("Error banning user");
    }
  };

  return (
    <>
      {showUserData && userData ? (
        <div>
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "30px",
            }}>
            User information
          </div>
          <div className={styles.userOverview}>
            <FaEllipsisV
              className={styles.menuIcon}
              onClick={handleMenuClick}
            />
            {showMenu && (
              <div
                className={styles.dropdown}
                ref={dropdownRef}>
                <div onClick={handleBanClick}>Ban user</div>
                <div onClick={handleWarnClick}>Warn user</div>
              </div>
            )}
            <div className={styles.labelValue}>
              <div>
                <strong>Full name</strong>
                <div>{userData.name}</div>
              </div>
              <div>
                <strong>Address</strong>
                <div>{userData.address}</div>
              </div>
              <div>
                <strong>Email</strong>
                <div>{userData.email}</div>
              </div>
            </div>
            <div className={styles.labelValue}>
              <div>
                <strong>Account date</strong>
                <div>
                  {new Date(userData.accountCreationDate).toLocaleDateString()}
                </div>
              </div>
              <div>
                <strong>User ID</strong>
                <div>{showUserId}</div>
              </div>
              <div>
                <strong>Phone number</strong>
                <div>{userData.phoneNumber}</div>
              </div>
            </div>
          </div>

          <div
            style={{ textAlign: "center", fontWeight: "bold", margin: "30px" }}>
            User bids
          </div>

          <div>
            {userBids.pendingBids?.map((bid) => (
              <div
                className={styles.bids}
                key={bid._id}>
                <div>
                  <div className={styles.first}>
                    <div>
                      <strong>Bid address</strong>
                      <div>{bid.address.street}</div>
                    </div>
                    <div>
                      <strong>Street code</strong>
                      <div>{bid.address.postcode}</div>
                    </div>
                  </div>

                  <div className={styles.first}>
                    <div>
                      <strong>Bid amount</strong>
                      <div>{bid.amount}</div>
                    </div>
                    <div>
                      <strong>Date</strong>
                      <div>
                        {new Date(bid.address.bidDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button className={styles.acceptButton}>Accept</button>
                  <button className={styles.denyButton}>Deny</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {showBanForm ? <div></div> : null}
    </>
  );
};

UserOverview.getLayout = function getLayout(userOverview) {
  return <Layout>{userOverview}</Layout>;
};

export default UserOverview;
