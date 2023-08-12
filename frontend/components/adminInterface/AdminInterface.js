import styles from "./AdminInterface.module.css";
import {
  getAllUsers,
  getAllPendingPropertiesByUserId,
  findAllPendingProperties,
  banUser,
  getAllBids,
  getAllPendingBids,
  getAllBidsAcceptedByAdmin,
  getUser,
  getAllPendingPropertiesByPropertyId,
} from "../../services/backendService";

import BidsComponent from "../../components/adminInterface/outputComponents/bids";
import UserComponent from "../../components/adminInterface/outputComponents/user";

import PendingBids from "../../components/adminInterface/outputComponents/pendingBids";
import AcceptedBidsByAdmin from "../../components/adminInterface/outputComponents/acceptedBidsByAdmin.js";

import PendingProperty from "./outputComponents/pendingProperties";
import { useDispatch, useSelector } from "react-redux";
import {
  setTypeData,
  setItemData,
  clearData,
} from "../../redux/slices/adminOutputSlice";
import { handleShowAdminInterface } from "../../redux/slices/componentSlice";
 

const AdminInterface = () => { 
  const dispatch = useDispatch();
  const showTypeData = useSelector((state) => state.adminOutput.OutPutItems);
  const showAdminData = useSelector((state) => state.adminOutput.Items);

  let _bids = "bids";
  let _users = "users";
  let _pendingProperties = "pendingProperties";
  let _pendingBids = "pendingBids";
  let _acceptedBidsByAdmin = "AcceptedBidsByAdmin";

  const showUserRole = useSelector((state) => state.user.role);

  if (!showUserRole === "admin") {
    // console.log(showUserRole);

    return (
      <div className={`${"component-frame"} ${styles.main}`}>
        <div className={styles.box}>
          <div>You are not an admin.</div>
        </div>
      </div>
    );
  }
  const clearAll = () => {
    dispatch(clearData());
  };

  const closeComponent = () => {
    dispatch(clearData());
    dispatch(handleShowAdminInterface(false));
  };

  const _setTypeData = (type) => {
    dispatch(setTypeData(type));
  };

  const _setAdminData = (data) => {
    dispatch(setItemData(data));
  };

  const setUserData = (users) => {
    clearAll();
    _setTypeData(_users);
    _setAdminData(users);
  };

  const setPendingData = (pendingProperties) => {
    clearAll();
    _setTypeData(_pendingProperties);
    _setAdminData(pendingProperties);
  };

  const setBidsData = (bids) => {
    clearAll();
    _setTypeData(_bids);
    _setAdminData(bids);
  };

  const setPendingBidsData = (bids) => {
    clearAll();
    _setTypeData(_pendingBids);
    _setAdminData(bids);
  };

  const setAllBidsAcceptedByAdmin = (bids) => {
    clearAll();
    _setTypeData(_acceptedBidsByAdmin);
    _setAdminData(bids);
  };

  async function _getAllUsers() {
    let users = await getAllUsers();
    let user = Object.values(users.msg);
    return user;
  }

  async function getAllPendingPropertiesForUser(userId) {
    let result = await getAllPendingPropertiesByUserId(userId);
    return result.pendingProperties;
  }

  async function getAllPendingPropertiesForProperties(pendingPropertyId) {
    let result = await getAllPendingPropertiesByPropertyId(pendingPropertyId);
    return result.pendingProperties;
  }

  async function getAllPendingProperties() {
    let result = await findAllPendingProperties();
    return result.pendingProperties;
  }

  async function _getUser(user) {
    let _user = await getUser(user);

    return _user;
  }

  const renderUsers = async () => {
    let users = await getAllUsers();
    setUserData(users);
  };

  const renderPendingPropertiesForUser = async (userId) => {
    let properties = await getAllPendingPropertiesForUser(userId);
    setPendingData(properties);
  };

  const renderPendingPropertiesForProperty = async (propertyId) => {
    let properties = await getAllPendingPropertiesForProperties(propertyId);

    setPendingData(properties);
  };

  const renderAllPendingProperties = async () => {
    let properties = await getAllPendingProperties();

    setPendingData(properties);
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

  async function resetPassword(email) {
    console.log('fix getNewPassword method in backendService.js')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailInput = document.querySelector('input[name="userEmail"]');
    if (!emailInput) {
      console.error("User email input not found");
      return;
    }
    const email = emailInput.value;
    try {
      const result = await resetPassword(email);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  const renderBids = async () => {
    let bids = await getAllBids();

    setBidsData(bids);
    return bids;
  };

  const _renderPendingBids = async () => {
    let bids = await getAllPendingBids();

    setPendingBidsData(bids);
    return bids;
  };

  const _renderAllBidsAcceptedByAdmin = async () => {
    let bids = await getAllBidsAcceptedByAdmin();

    setAllBidsAcceptedByAdmin(bids);
    return bids;
  };

  return (
    <>
      <div
        className={`${"component-frame"} ${styles.main}`}
        onLoad={() => {
          isAdmin();
        }}>
        <button
          className={`${styles.closeButton} `}
          onClick={() => closeComponent()}>
          X
        </button>
        <h2 className={`${"button-frame"} ${styles.adminTitle}`}>Admin Menu</h2>
        <div className={styles.box}>
          <div>
            <div className={`${styles.adminMenuChoice} `}>
              <li onClick={() => clearAll()}>Clear</li>
            </div>
            <div className={`${styles.adminMenuChoice} `}>
              <li
                onClick={() => {
                  renderUsers();
                }}>
                Show Users
              </li>
            </div>

            <div className={`${styles.adminMenuChoice} `}>
              <li
                onClick={() => {
                  renderBids();
                }}>
                Show All Bids
              </li>
            </div>
            <div className={`${styles.adminMenuChoice} `}>
              <li
                onClick={() => {
                  _renderPendingBids();
                }}>
                Show Pending Bids
              </li>
            </div>
            <div className={`${styles.adminMenuChoice} `}>
              <li
                onClick={() => {
                  _renderAllBidsAcceptedByAdmin();
                }}>
                Show Accepted Bids by Admins
              </li>
            </div>
            <div className={`${styles.adminMenuChoice} `}>
              <li
                onClick={() => {
                  renderAllPendingProperties();
                }}>
                Get All Pending Properties
              </li>
            </div>
            <div className={`${styles.adminMenuChoice} `}>
              <form className="formContainer">
                <label
                  className="propertyId"
                  htmlFor="propertyId">
                  <span className="placeholder">
                    Pending Properties for PROPERTY
                  </span>
                  <input
                    className="inputField"
                    id="propertyId"
                    name="PropertyId"
                    type="text"></input>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    console.log(propertyId.value);
                    renderPendingPropertiesForProperty(propertyId.value);
                  }}>
                  Submit
                </button>
              </form>
            </div>
            <div className={`${styles.adminMenuChoice} `}>
              <form className="formContainer">
                <span className="placeholder">Pending Properties for USER</span>
                <label
                  className="userId"
                  htmlFor="userId">
                  <input
                    className="inputField"
                    id="userId"
                    name="UserId"
                    type="text"></input>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const userId = document.getElementById("userId");
                    renderPendingPropertiesForUser(userId.value);
                  }}>
                  Submit
                </button>
              </form>
            </div>

            <div className={`${styles.adminMenuChoice} `}>
              <form className="formContainer">
                <span className="placeholder">
                  Get User Status. still not fixed output role and message if it
                  exist
                </span>
                <label
                  className="userId"
                  htmlFor="userId">
                  <input
                    className="inputField"
                    id="userId"
                    name="UserId"
                    type="text"></input>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    renderPendingPropertiesForUser(userId.value);
                  }}>
                  Submit
                </button>
              </form>
            </div>

            <div className={`${styles.adminMenuChoice} `}>
              <form className="formContainer">
                <label
                  className="userBanId"
                  htmlFor="userBanId">
                  <span className="placeholder">Ban User</span>
                  <input
                    className="inputField"
                    id="userBanId"
                    name="userBanId"
                    type="text"></input>
                  <span className="placeholder">Ban Message</span>
                  <textarea
                    className="inputField"
                    id="userMessageBan"
                    name="userMessageBan"
                    type="text"
                    required></textarea>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    if (userMessageBan.value) {
                      banUserByUserId(userBanId.value, userMessageBan.value);
                    } else {
                      alert("You need to fill all forms.");
                    }
                  }}>
                  Submit
                </button>
              </form>
            </div>

            <div className={`${styles.adminMenuChoice} `}>
              <form className="formContainer">
                <span className="placeholder">Reset Password</span>
                <label
                  className="userEmail"
                  htmlFor="userEmail">
                  <input
                    className="inputField"
                    id="userEmail"
                    name="userEmail"
                    type="text"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleSubmit}>
                  Submit
                </button>
              </form>
            </div>
          </div>

          {showTypeData.payload === _bids
            ? showAdminData?.map((bid, index) => (
                <BidsComponent
                  data={bid}
                  key={bid._id ? bid._id : index}
                />
              ))
            : null}

          {showTypeData.payload === _users
            ? showAdminData?.map((user, index) => (
                <UserComponent
                  data={user}
                  key={user._id ? user._id : index}
                />
              ))
            : null}

          {showTypeData.payload === _pendingBids
            ? showAdminData?.map((bid, index) => (
                <PendingBids
                  data={bid}
                  key={bid._id ? bid._id : index}
                />
              ))
            : null}

          {showTypeData.payload === _acceptedBidsByAdmin
            ? showAdminData?.map((bid, index) => (
                <AcceptedBidsByAdmin
                  data={bid}
                  key={bid._id ? bid._id : index}
                />
              ))
            : null}

          {showTypeData.payload === _pendingProperties
            ? showAdminData?.map((pendingProperty, index) => (
                <PendingProperty
                  data={pendingProperty}
                  key={pendingProperty._id ? pendingProperty._id : index}
                />
              ))
            : null}

          {}
        </div>
      </div>
    </>
  );
};

export default AdminInterface;
