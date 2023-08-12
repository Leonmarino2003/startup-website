//import Head from "next/head";
//import ComponentHandler from "../components/componenthandler.js";
//import Disclaimer from "../components/Disclaimer.js";
import SplashScreen from "../components/SplashScreen.js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showNewPin } from "../redux/slices/mapSlice";
import { shouldPostBid, updateBid } from "../redux/slices/bidSlice";
import {
  changeLanguage,
  changeCurrency,
  handleProfileImage,
  setRole,
} from "../redux/slices/userSlice";
import Mapbox from "../components/Mapbox";
import style from "../styles/Home.module.css";
import {
  getImageFromDB,
  placeAnonBidInDB,
  getRole,
} from "../services/backendService";
import languagesJson from "../languages.json";
import Navbar from "../components/Navbar.js";
import {
  handleShowOverlay,
  hideAll,
  handleShowSettings,
} from "../redux/slices/componentSlice";
import { setIsLoggedIn, setLoginPopup } from "../redux/slices/loginSlice";
import { verifyJWT } from "../services/backendService.js";
import Layout from "../components/Layout.js";

function HomePage() {
  const dispatch = useDispatch();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const placedPin = useSelector((state) => {
    return state.map.placedPin;
  });

  const amount = useSelector((state) => {
    return state.placeBid.bid.amount;
  });
  const address = useSelector((state) => {
    return state.placeBid.bid.address;
  });
  const registerPlot = useSelector((state) => state.map.registerPlotView);

  const showSplashScreen = useSelector((state) => {
    return state.splash.displaySplashScreen;
  });
  const showOverlay = useSelector((state) => {
    return state.componentHandler.showOverlay;
  });
  const displayLogIn = useSelector((state) => {
    return state.componentHandler.showLogIn;
  });
  const displayMyBids = useSelector((state) => {
    return state.componentHandler.showMyBids;
  });
  const displayMyPlots = useSelector((state) => {
    return state.componentHandler.showMyPlots;
  });
  const showRegisterCardSwiper = useSelector((state) => {
    return state.componentHandler.showRegisterCardSwiper;
  });
  const loginPopup = useSelector((state) => {
    return state.login.loginPopup;
  });

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  useEffect(() => {
    let savedLanguage;
    async function hasSavedLanguage() {
      savedLanguage = await fetchDisplayLanguage();
      if (savedLanguage) {
        dispatch(changeLanguage(savedLanguage));
      }
    }
    hasSavedLanguage();

   /* async function checkIfLoggedIn() {
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
      const userRoleFromDb = await getRole(isLoggedIn.user);

      if (userRoleFromDb.success) {
        dispatch(setRole(userRoleFromDb.role));
      }
    }
    checkIfLoggedIn();*/

    fetchProfileImage();

    if ("geolocation" in navigator) {
      if (!savedLanguage) {
        let newLanguage = navigator.language;
        if (languagesJson[newLanguage]) dispatch(changeLanguage(newLanguage));
      }
      navigator.geolocation.getCurrentPosition(onSuccess, (error) => {
        poseidon();
      });
    } else {
      poseidon();
    }
  }, []);

  async function fetchDisplayLanguage() {
    try {
      const fromLS = localStorage.getItem("language");
      if (fromLS) {
        return fromLS;
      } else {
        return false;
      }
    } catch (err) {}
  }

  useEffect(() => {
    let savedCurrency;
    async function hasSavedCurrency() {
      savedCurrency = await fetchCurrency();
      if (savedCurrency) {
        dispatch(changeCurrency(savedCurrency));
      }
    }
    hasSavedCurrency();
  }, []);

  async function fetchCurrency() {
    try {
      const fromLS = localStorage.getItem("currency");
      if (fromLS) {
        return fromLS;
      } else {
        return false;
      }
    } catch (err) {}
  }

  function onSuccess(position) {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  }

  function poseidon() {
    setLat(57.69719332509433);
    setLng(11.979597367745832);
  }

  // If a bid was placed, and the user didn't register and the user isn't already logged in
  // send a bid anonymously to the database anyways without a user
  useEffect(() => {
    if (amount && address && !placedPin) {
      // Place the bid anonymously
      async function bidOnPlot() {
        // Sending bid to database
        const bidObj = {
          bid: {
            amount,
            address: {
              street: address.street,
              postcode: address.postcode,
              city: address.city,
              country: address.country,
            },
          },
          user: null,
        };
        const data = await placeAnonBidInDB(bidObj);
        // Run reset bid function after the bid's been placed
        resetPostBid();
      }
      // Reset the bid
      function resetPostBid() {
        const resetBid = {
          bid: null,
          address: {},
        };
        dispatch(shouldPostBid(false));
        dispatch(updateBid(resetBid));
      }
      bidOnPlot();
    }
  }, [amount, address, placedPin, dispatch]);

  async function fetchProfileImage() {
    const isLoggedIn = await verifyJWT();
    if (!isLoggedIn) {
      return;
    }
    if (isLoggedIn) {
      if (!isLoggedIn.loggedIn) return;
    }

    const imageFromDB = await getImageFromDB(isLoggedIn.user);
    if (imageFromDB.success) {
      dispatch(handleProfileImage(imageFromDB.profileImage));
    }
  }

  function loginPopUpBox() {
    setTimeout(() => {
      dispatch(setLoginPopup(false));
    }, [2000]);

    return (
      <div className={style.loginPopUpBox}>
        <p>Ploteye</p>
        <p>You successfully logged in.</p>
      </div>
    );
  }

  return (
    <>
      <div className={style.container}>
        {loginPopup ? loginPopUpBox() : <></>}
        {lng && lat && (
          <Mapbox
            lat={lat}
            lng={lng}
          />
        )}
        {placedPin && (
          <>
            <div
              onClick={() => {
                dispatch(showNewPin(false));
                dispatch(hideAll());
              }}
              className={style.overlay}></div>
          </>
        )}
        <Navbar />
        {/* <ComponentHandler /> */}
        {/*   <Disclaimer /> */}
        {showSplashScreen && <SplashScreen />}

        {(displayLogIn || displayMyBids || displayMyPlots || showOverlay) &&
          !placedPin && (
            <div
              onClick={() => {
                dispatch(hideAll());
                dispatch(handleShowOverlay(false));
                dispatch(handleShowSettings(false));
              }}
              className={style.overlay}></div>
          )}
        {registerPlot && (
          <>
            <div className={style.border}></div>
            <div className={style.registerInfo}>
              {translations.findAndRegister}
            </div>
          </>
        )}
      </div>
    </>
  );
}
HomePage.getLayout = function getLayout(homePage) {
  return  <Layout hasFooter={false}>{homePage}</Layout>;
  
};

export default HomePage;
