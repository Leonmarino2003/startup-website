import styles from "./adminDashboard.module.css";
import {
  getRole,
  getAllUsers,
  banUser,
  getAllBids,
  getAllPendingBids,
  getAllBidsAcceptedByAdmin,
  getUser,
  getAllDeniedBids,
  verifyJWT,
  getBannedUsers,
} from "../../services/backendService";
import { CiSearch } from "react-icons/ci";
import { setIsLoggedIn, setLoginPopup } from "../../redux/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import {
  setTypeData,
  setItemData,
  clearData,
} from "../../redux/slices/adminOutputSlice";
import { handleShowAdminInterface } from "../../redux/slices/componentSlice";
import { IoBan, IoHomeSharp } from "react-icons/io5";
import { FaSort, FaWallet } from "react-icons/fa";
import { MdOutlinePending, MdPeople } from "react-icons/md";
import ShowUsers from "../../components/AdminView/ShowUsers";
import { BsHash } from "react-icons/bs";
import { FiDatabase } from "react-icons/fi";
import { AiOutlineCheck, AiOutlineExclamationCircle } from "react-icons/ai";
import Layout from "../../components/Layout";
import PendingBids from "../../components/AdminView/PendingBids";
import AcceptedBids from "../../components/AdminView/AcceptedBids";
import DeniedBids from "../../components/AdminView/DeniedBids";
import ShowAllBids from "../../components/AdminView/ShowAllBids";
import RecentBids from "../../components/AdminView/RecentBids"
import translate from "../../languages/translate";
import BannedUsers from "../../components/AdminView/BannedUsers";
import BidOverview from "../../components/AdminView/bidOverview";
import DenyBidProcess from "../../components/AdminView/denyBidProcess";
import AcceptBidProcess from "../../components/AdminView/acceptBidProcess";
import { useRouter } from 'next/router';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const showTypeData = useSelector((state) => state.adminOutput.OutPutItems);
  const showAdminData = useSelector((state) => state.adminOutput.Items);
  //const [selectedBid, setSelectedBid] = useState(null);
  const [active, setActive] = useState("");
  const [showUserBids, setShowUserBids] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [searchString, setSearchString] = useState("");
  const [category, setCategory] = useState("");
  const [showLimiter, setShowLimitier] = useState(showAdminData.length);
  const [showButtons, setShowButtons] = useState(true);
  const router = useRouter();

  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = translate.fromSpecific(languageToUse);

  async function checkIfLoggedIn() {
    // Verify JWT and get user if logged in
    const isLoggedIn = await verifyJWT();

    // Exit function if JWT is not verified
    if (!isLoggedIn) {
      dispatch(setIsLoggedIn(false));
      return;
    }
    if (isLoggedIn) {
      if (!isLoggedIn.loggedIn) {
        dispatch(setIsLoggedIn(false));
        return;
      }
      if (!isLoggedIn.user) {
        dispatch(setIsLoggedIn(false));
        return;
      }
    }

    // Set logged in to true
    dispatch(setIsLoggedIn(true));

    // Get user name from database
    // const nameFromFB = await getNameFromDB(isLoggedIn.user);
    // if (nameFromFB.success && nameFromFB.name) {
    //   const firstName = nameFromFB.name.firstName;
    //   const lastName = nameFromFB.name.lastName;
    //   dispatch(handleName({ firstName, lastName }));
    // }

    // Get Role from database
    
    // if (userRoleFromDb.success) {
    //   dispatch(setRole(userRoleFromDb.role));
    // }
  }
  checkIfLoggedIn();

  let _bids = "bids";
  let _users = "users";
  let _pendingProperties = "pendingProperties";
  let _pendingBids = "pendingBids";
  let _acceptedBidsByAdmin = "AcceptedBidsByAdmin";
  let _deniedBids = "deniedBids";
  let _banned = "banned";
  let _recent = "recent";
  
  //let _bidOverview = "bidOverview";
  //let _denyProcess = "denyProcess";
  //let _acceptProcess = "acceptProcess"

  const showUserRole = useSelector((state) => state.user.role);
 
  
  //console.log(getUser())
  if (showUserRole !== "admin") {
    // console.log(showUserRole);

    return (
      <div className={`${styles.main}`}>
        <div className={styles.box}>
          <div>{translations.AdminAccessDenied}</div>
        </div>
      </div>
    );
  }
  const clearAll = () => {
    dispatch(clearData());
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
  const setBannedUserData = (users) => {
    clearAll();
    _setTypeData(_banned);
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

  const setRecentBids = (bids) => {
    clearAll();
    _setTypeData(_recent);
    _setAdminData(bids)
  }
  const setAllBidsAcceptedByAdmin = (bids) => {
    clearAll();
    _setTypeData(_acceptedBidsByAdmin);
    _setAdminData(bids);
  };

  const setDeniedBidsData = (bids) => {
    clearAll();
    _setTypeData(_deniedBids);
    _setAdminData(bids);
  };

  const renderUsers = async () => {
    let users = await getAllUsers();
    setUserData(users);
  };
  const renderBannedUsers = async () => {
    let users = await getBannedUsers();
    setBannedUserData(users);
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

  const _renderDeniedBids = async () => {
    let bids = await getAllDeniedBids();

    setDeniedBidsData(bids);
    return bids;
  };

  const _renderAllBidsAcceptedByAdmin = async () => {
    let bids = await getAllBidsAcceptedByAdmin();

    setAllBidsAcceptedByAdmin(bids);
    return bids;
  };

  const getUserDataFromAPI = async () => {
    const userData = await getAllDeniedBids();
    //console.log("UserData:", userData); // log the returned data
    return userData;
  };

  const getUserData = async () => {
    const getData = await getUserDataFromAPI();
    //console.log("GetData:", getData); // log the result of the API call
  };

  getUserData();
  
   //get bids from over a week
  const  getWeekDates = () => {

    let now = new Date();
    let numDay = now.getDate();
    // today date
    let start = new Date(now); //copy
    start.setDate(numDay);
    
    //date a day ago
    let end = new Date(now); //copy
    end.setDate( numDay - 1);
    //console.log(start, end)
    
    return [start, end];
  }
  

  const renderRecentBids = async () => {
    let [start, end] = getWeekDates();
    const bids = await getAllBids();
    const weeksBids = bids.msg.filter(
      (data) => data.address.bidDate >= end.toISOString())
    
      setRecentBids(weeksBids)
    return weeksBids; 
  }

  const statusMessage = (value) => {
    // converts bids value to its name counterpart
    let activeStatus = "";
    if (value?.bidStatus === 1) {
      activeStatus = "Pending";
    } else if (value?.bidStatus === 2) {
      activeStatus = "Completed";
    } else if (value?.bidStatus === 5) {
      activeStatus = "Rejected";
    } else if(value?.bidStatus === 4){
      activeStatus = "Won";
    }else if (value?.role === "banned") {
      // this is specifically for banned users
      activeStatus = "banned";
    } 
      return activeStatus;
    
  };

  // checks if inputed search matches any of the values that exists
  const compareValueWithSearch = (item, searchString) => {
    const title = item?.toLowerCase();
    const search = searchString?.toLowerCase();
    return title?.includes(search);
  };

  // filters function compareValuewithSearch to get searched values only for bids.
  const searchBidData = (value, nestedValue) =>
  
    showAdminData.filter((item,index) => 
    compareValueWithSearch(item[value]?.[nestedValue], searchString) &&
        index < showLimiter 
    ).slice(0,showLimiter);
   
  // filter functions based on users
  const searchUserData = (value) =>
    showAdminData.filter(
      (item) => compareValueWithSearch(item?.[value], searchString)
        // for limiting shown values  
    ).slice(0,showLimiter)


    //Used for when showing all bids of one user in ShowUsers page. 
  const filteredAdminData = showAdminData.filter(
    (item) => item._id === targetId || item.user === targetId
  );

  

  // shows currently activated content in the admin navigation with a color
  const showActiveContent = () => {
    return styles.activeContent;
  };

  const handleActiveClick = (event) => {
    setActive(event.target.name);
  };
  // sets all states to normal when clicked on in admin navbar
  const setStateToNormal = () => {
     if(showUserBids)clearAll(); // for removing the show user bids when clicking on admin navbars
    setCategory("");
    setShowLimitier(showAdminData.length);
  };

  const onCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(value);
  };

  const onLimitChange = (event) => {
    const value = event.target.value;
    setShowLimitier(value);
  };

  //handles the search filter. Can be used to handle any types of filter.
  const handleSearchFilters = () => {
    if (
      category === "street" ||
      category === "postcode" ||
      category === "city"
    ) {
      return searchBidData("address", category)
      // below is for handling in show all users page.
    } else if (
      category === "name" ||
      category === "address" ||
      category === "email"
    ) {
      return searchUserData(category)
    } else {
      //if no options have been selected it returns the normal map and search input does nothing
      return showAdminData;
    }
  };

  /*const handleShowBidOverview = (bid) => {
    _setTypeData(_bidOverview);
    setSelectedBid(bid);
    setShowButtons(false);
  };

  const handleShowDenyProcess = () => {
    _setTypeData(_denyProcess);
    setShowButtons(false);
  };

  const handleShowAcceptProcess = () => {
    _setTypeData(_acceptProcess);
    setShowButtons(false);
  };

  const handleGoBackToList = () => {
    _setTypeData(_bids);
    setShowButtons(true);
  }*/

  const handleShowBidPage = (id) => {
    router.push(`/bid/${id}`);
  };

  return ( 
     <>
      <div className={styles.test}>
        <div>
          {showButtons && (
          <div className={styles.choiceContainer}>
            <button
              className={
                active === "dashBoard" ? showActiveContent() : undefined
              }
              name={"dashBoard"}
              onClick={(e) => {
                handleActiveClick(e);
                clearAll();
              }}>
              <IoHomeSharp />
              {translations.Dashboard}
            </button>
            <button
            className={
                active === "recent" ? showActiveContent() : undefined
              }
              name={"recent"}
             onClick={(e) => {
                setStateToNormal();
                handleActiveClick(e);
                renderRecentBids();
                setShowUserBids(false);
              }}>
              <FaWallet />
              {translations.recentBids}
            </button>
            <button
              className={
                active === "showUsers" ? showActiveContent() : undefined
              }
              name={"showUsers"}
              onClick={(e) => {
                setStateToNormal();
                handleActiveClick(e);
                renderUsers();
                setShowUserBids(false);
              }}>
              <MdPeople />
              {translations.ShowUsers}
            </button>
            <button
              className={
                active === "showAllBids" ? showActiveContent() : undefined
              }
              name={"showAllBids"}
              onClick={(e) => {
                setStateToNormal();
                handleActiveClick(e);
                renderBids();
                setShowUserBids(false);
              }}>
              <FiDatabase />
              {translations.AdminShowBids}
            </button>
            <button
              name={"accepted"}
              className={
                active === "accepted" ? showActiveContent() : undefined
              }
              onClick={(e) => {
                setStateToNormal();
                handleActiveClick(e);
                _renderAllBidsAcceptedByAdmin();
                setShowUserBids(false);
              }}>
              <AiOutlineCheck />
              {translations.AcceptedBids}
            </button>
            <button
              name={"pending"}
              className={active === "pending" ? showActiveContent() : undefined}
              onClick={(e) => {
                setStateToNormal();
                handleActiveClick(e);
                _renderPendingBids();
                setShowUserBids(false);
              }}>
              <MdOutlinePending />
              {translations.PendingBids}
            </button>
            <button
              name={"denied"}
              className={active === "denied" ? showActiveContent() : undefined}
              onClick={(e) => {
                setStateToNormal();
                handleActiveClick(e);
                _renderDeniedBids();
                setShowUserBids(false);
              }}>
              <IoBan />
              {translations.DeniedBids}
            </button>
            <button
            name={"banned"}
              className={active === "banned" ? showActiveContent() : undefined}
              onClick={(e) => {
                setStateToNormal();
                handleActiveClick(e);
                renderBannedUsers();
                setShowUserBids(false);
              }}>
              <AiOutlineExclamationCircle />
              {translations.BannedUsers}
            </button>
          </div>)}
       </div>

        {showTypeData.payload === _recent && showAdminData?.length > 0 && (
          <>
            <div>
            <div className={styles.adminInnerHeader}>
              <h3>Recent bids</h3>
            </div>
              <table>
                <thead>
                  <tr className={styles.tableHead}>
                    <th>
                      <BsHash />
                    </th>
                    <th>
                      {" "}
                      {translations.name} <FaSort />
                    </th>
                    <th>
                      {" "}
                      {translations.BidAmmount} <FaSort />
                    </th>
                    <th>
                      {" "}
                      {translations.Date} <FaSort />
                    </th>
                    <th>
                      {" "}
                      {translations.Status} <FaSort />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { showAdminData.map((bid, index) => (
                        <RecentBids
                          setShowUserBids={setShowUserBids}
                          setTargetId={setTargetId}
                          statusMessage={statusMessage}
                          data={bid}
                          key={bid._id ? bid._id : index}
                        />
                      ))
                    }
                </tbody>
              </table>
            </div>
            </>
        )}

        {showTypeData.payload === _users && showAdminData?.length > 0 && (
          <>
            <div>
              <div className={styles.adminInnerHeader}>
                <h3>Show all users</h3>
                <div style={{ marginTop: "20px", border: "none" }}>
                  <CiSearch />
                  <input
                    type="text"
                    onChange={(e) => {
                      setSearchString(e.target.value);
                    }}
                    placeholder={`Search by`}
                  />
                </div>
                <select
                  value={category}
                  onChange={onCategoryChange}>
                  <option defaultValue="">select option</option>
                  <option value={"name"}>name</option>
                  <option value={"address"}>address</option>
                  <option value={"email"}>email</option>
                </select>
                {category !== "" ? (
                  <select
                    value={showLimiter}
                    onChange={onLimitChange}>
                    <option
                      defaultValue={showAdminData.length}
                      value={showAdminData.length}>
                      Show all
                    </option>
                    <option value={10}>Show 10</option>
                    <option value={5}>Show 5</option>
                    <option value={3}>Show 3</option>
                  </select>
                ) : null}
              </div>
              <table>
                <thead>
                  <tr className={styles.tableHead}>
                    <th>
                      {" "}
                      <BsHash />{" "}
                    </th>
                    <th>
                      {" "}
                      {translations.name} <FaSort />{" "}
                    </th>
                    <th>
                      {" "}
                      {translations.Email} <FaSort />{" "}
                    </th>
                    <th>
                      {" "}
                      {translations.PhoneNumber} <FaSort />{" "}
                    </th>
                    <th>
                      {" "}
                      {translations.address} <FaSort />{" "}
                    </th>
                    <th>
                      {" "}
                      {translations.AccountCreationDate} <FaSort />{" "}
                    </th>
                    {/* <th> Status <FaSort /> </th> */}
                  </tr>
                </thead>
                <tbody>
                  {showUserBids === false
                    ? handleSearchFilters().map((user, index) => (
                        <ShowUsers
                          setTargetId={setTargetId}
                          setShowUserBids={setShowUserBids} 
                          statusMessage={statusMessage}
                          data={user}
                          key={user._id ? user._id : index}
                        />
                      ))
                    : filteredAdminData.map((user, index) => (
                        <ShowUsers
                          setTargetId={setTargetId}
                          setShowUserBids={setShowUserBids}
                          statusMessage={statusMessage}
                          data={user}
                          key={user._id ? user._id : index}
                        />
                        ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {showTypeData.payload === _pendingBids && showAdminData?.length > 0 && (
          <>
            <div>
              <table>
                <thead>
                  <tr className={styles.tableHead}>
                    <th>
                      <BsHash />
                    </th>
                    <th>
                      {" "}
                      {translations.name} <FaSort />
                    </th>
                    <th>
                      {" "}
                      {translations.BidAmmount} <FaSort />
                    </th>
                    <th>
                      {" "}
                      {translations.Date} <FaSort />
                    </th>
                    <th>
                      {" "}
                      {translations.Status} <FaSort />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { showAdminData.map((bid, index) => (
                        <PendingBids
                          setShowUserBids={setShowUserBids}
                          setTargetId={setTargetId}
                          statusMessage={statusMessage}
                          data={bid}
                          key={bid._id ? bid._id : index}
                        />
                      ))
                    }
                </tbody>
              </table>
            </div>
          </>
        )}

        {showTypeData.payload === _bids && showAdminData?.length > 0 && (
          <>
            <div>
              <div className={styles.adminInnerHeader}>
                <h3>Recent bids</h3>
                <div style={{ marginTop: "20px", border: "none" }}>
                  <CiSearch />
                  <input
                    type="text"
                    onChange={(e) => {
                      setSearchString(e.target.value);
                    }}
                    placeholder={`Search by`}
                  />
                </div>
                <select
                  value={category}
                  onChange={onCategoryChange}>
                  <option defaultValue="">select option</option>
                  <option value={"street"}>street</option>
                  <option value={"city"}>city</option>
                  <option value={"postcode"}>post code</option>
                  <option value={"amount"}>bid amount</option>
                </select>
                {category !== "" ? (
                  <select
                    value={showLimiter}
                    onChange={onLimitChange}>
                    <option
                      defaultValue
                      value={showAdminData.length}>
                      Show all
                    </option>
                    <option value={10}>Show 10</option>
                    <option value={5}>Show 5</option>
                    <option value={3}>Show 3</option>
                  </select>
                ) : null}
              </div>
              <table>
                <thead>
                  <tr className={styles.tableHead}>
                    <th>
                      {" "}
                      <BsHash />{" "}
                    </th>
                    <th>
                      {" "}
                      {translations.name} <FaSort />{" "}
                    </th>
                    <th>
                      {" "}
                      {translations.BidAmmount} <FaSort />{" "}
                    </th>
                    <th>
                      {" "}
                      {translations.Date} <FaSort />{" "}
                    </th>
                    <th>
                      {" "}
                      {translations.Status} <FaSort />{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {handleSearchFilters().map((bid, index) => (
                        <ShowAllBids
                          statusMessage={statusMessage}
                          setShowUserBids={setShowUserBids}
                          setTargetId={setTargetId}
                          data={bid}
                          key={bid._id ? bid._id : index}
                        />
                      ))
                    }
                </tbody>
              </table>
            </div>
          </>
        )}

        {showTypeData.payload === _deniedBids && showAdminData?.length > 0 && (
          <>
            <table>
              <thead>
                <tr className={styles.tableHead}>
                  <th>
                    {" "}
                    <BsHash />{" "}
                  </th>
                  <th>
                    {" "}
                    {translations.name} <FaSort />{" "}
                  </th>
                  <th>
                    {" "}
                    {translations.BidAmmount} <FaSort />{" "}
                  </th>
                  <th>
                    {" "}
                    {translations.Date} <FaSort />{" "}
                  </th>
                  <th>
                    {" "}
                    {translations.Status} <FaSort />{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {showAdminData.map((bid, index) => (
                  <DeniedBids
                    statusMessage={statusMessage}
                    data={bid}
                    key={bid._id ? bid._id : index}
                  />
                ))}
              </tbody>
            </table>
          </>
        )}

        {showTypeData.payload === _acceptedBidsByAdmin &&
          showAdminData?.length > 0 && (
            <>
              <table>
                <thead>
                  <tr className={styles.tableHead}>
                    <th>
                      {" "}
                      <BsHash />{" "}
                    </th>
                    <th>
                      {" "}
                      {translations.name} <FaSort />{" "}
                    </th>
                    <th>
                      {" "}
                      {translations.BidAmmount} <FaSort />{" "}
                    </th>
                    <th>
                      {" "}
                      {translations.Date} <FaSort />{" "}
                    </th>
                    <th>
                      {" "}
                      {translations.Status} <FaSort />{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {showAdminData.map((bid, index) => (
                    <AcceptedBids
                      statusMessage={statusMessage}
                      data={bid}
                      key={bid._id ? bid._id : index}
                    />
                  ))}
                </tbody>
              </table>
            </>
          )}

        {showTypeData.payload === _banned && showAdminData?.length > 0 && (
          <table>
            <thead>
              <tr className={styles.tableHead}>
                <th>
                  {" "}
                  <BsHash />{" "}
                </th>
                <th>
                  {" "}
                  {translations.name} <FaSort />{" "}
                </th>
                <th>
                  {" "}
                  {translations.Email} <FaSort />{" "}
                </th>
                <th>
                  {" "}
                  {translations.PhoneNumber} <FaSort />{" "}
                </th>
                <th>
                  {" "}
                  {translations.address} <FaSort />{" "}
                </th>
                <th>
                  {" "}
                  {translations.AccountCreationDate} <FaSort />{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {showAdminData.map((bid, index) => (
                <BannedUsers
                  statusMessage={statusMessage}
                  data={bid}
                  key={bid._id ? bid._id : index}
                  setTargetId={setTargetId}
                />
              ))}
            </tbody>
          </table>
        )}

          {/*{showTypeData.payload && showTypeData.payload === _bidOverview && (
            <BidOverview 
              data={selectedBid}
              dispatchDeny={handleShowDenyProcess}
              dispatchAccept={handleShowAcceptProcess}
              back={handleGoBackToList}
            />
          )}
          {showTypeData.payload && showTypeData.payload === _denyProcess && (
            <DenyBidProcess
            data={selectedBid}
            dispatchOverview = { ()=> {
              handleShowBidOverview(selectedBid)
            }}
            back={handleGoBackToList}/>
          )}
          {showTypeData.payload && showTypeData.payload === _acceptProcess && (
            <AcceptBidProcess
            data={selectedBid}
            dispatchOverview = { ()=> {
              handleShowBidOverview(selectedBid)
            }}
            back={handleGoBackToList}/>
          )}*/}
      </div>
    </>
  );
};

AdminDashboard.getLayout = function getLayout(adminDashboard) {
  return <Layout leftAligned>{adminDashboard}</Layout>;
};

export default AdminDashboard;
