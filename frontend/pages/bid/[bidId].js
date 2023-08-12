import styles from "./bidPage.module.css";
import {
  verifyJWT,
  //getBidById,
  updateBidStatuses
} from "../../services/backendService";
import { setIsLoggedIn, setLoginPopup } from "../../redux/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import Layout from "../../components/Layout";
import translate from "../../languages/translate";
import BidOverview from "../../components/AdminView/bidOverview";
import DenyBidProcess from "../../components/AdminView/denyBidProcess";
import AcceptBidProcess from "../../components/AdminView/acceptBidProcess";
import { useRouter } from 'next/router';


// This is the page for the admin interface that allows the admin to see and process a specific bid
const BidPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { bidId } = router.query;
  

  let _bidOverview = "bidOverview";
  let _denyProcess = "denyProcess";
  let _acceptProcess = "acceptProcess"
  const [selectedPage, setSelectedPage] = useState(_bidOverview);

  const useFetchBidData = (id) => {
    const [bidData, setBidData] = useState({});

    useEffect(() => {
      getData();
    }, [id]);

    const getData = async () => {
      try {
        const data = await updateBidStatuses(id, {});
        setBidData(data);
      } catch (error) {
        console.error(`Failed to fetch bid data: ${error}`);
      }
    };

    const updateBidData = (newData) => {
      setBidData(newData);
    };

    return { bidData, updateBidData, getData };
  };

  
  const { bidData, updateBidData, getData } = useFetchBidData(bidId);




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
  }
  checkIfLoggedIn();


  const showUserRole = useSelector((state) => state.user.role);
  if (showUserRole !== "admin") {

    return (
      <div className={`${styles.main}`}>
        <div className={styles.box}>
          <div>{translations.AdminAccessDenied}</div>
        </div>
      </div>
    );
  }
  
  const handlShowOverview = () => {
    getData(bidId)
    setSelectedPage(_bidOverview);
  }


  //console.log(bidData);

  return (
    <>
    <div>
        <button 
          className={styles.button} 
          onClick={ () => {router.push(`/adminDashboard`);}}
        >
          <div className={styles.buttonText} > Menu </div>
        </button>
      </div>
    {selectedPage === _bidOverview && bidData && <BidOverview 
      data={bidData}
      dispatchAccept={ () => setSelectedPage(_acceptProcess)}
      dispatchDeny={ () => setSelectedPage(_denyProcess)}
      />}
    {selectedPage === _acceptProcess && bidData && <AcceptBidProcess
      data={bidData}
      showOverview={handlShowOverview}
    />}
    {selectedPage === _denyProcess && bidData && <DenyBidProcess
      data={bidData}
      showOverview={handlShowOverview}
    />}
    </>
    )
}

BidPage.getLayout = function getLayout(BidPage) {
  return <Layout leftAligned>{BidPage}</Layout>;
};

export default BidPage;








