import styles from "./MyBids.module.css";
import { BiChevronDown } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { useState, useEffect } from "react";
import {
  getFavoriteProperties,
  fetchUser,
  verifyJWT,
  deleteBidAndAddInDeniedBids,
} from "../../services/backendService";
import { useSelector, useDispatch } from "react-redux";
import languagesJson from "../../languages.json";
import BiggerLoadingIcon from "../loadingIcons/BiggerLoadingIcon";

import {
  handleShowMyBids,
  handleShowBidContainer,
  handleShowOverlay,
} from "../../redux/slices/componentSlice";
import {
  populateBidDetails,
  populatePlotDetails,
} from "../../redux/slices/myBidsSlice";
import { setIsLoggedIn } from "../../redux/slices/loginSlice";

import BidStep from "./BidStep";
import FavoriteButton from "../favoritePlots/favoriteButton";
import Image from "next/image";
import Link from "next/link";

export default function MyBids() {
  const dispatch = useDispatch();
  const [myBids, setMyBids] = useState(null);
  const [myFavorites, setMyFavorites] = useState(null);
  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  useEffect(() => {
    async function findMyBids() {
      const isLoggedIn = await verifyJWT();
      if (isLoggedIn) {
        if (isLoggedIn.loggedIn) {
          const user = isLoggedIn.user;
          try {
            const result = await fetchUser(user);
            console.log(result);
            if (result.success) {
              setMyBids(result.mybids);
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          forceLogOut();
        }
      }
    }
    
  findMyBids();
    
  }, []);
 
  const getUserId = async () => {
    const isLoggedIn = await verifyJWT();
    if (isLoggedIn) {
      if (isLoggedIn.loggedIn) {
        return isLoggedIn.user;
      }
    }
  };
  useEffect(() => {
    async function findMyFavorites() {
      const isLoggedIn = await verifyJWT();
      if (isLoggedIn) {
        if (isLoggedIn.loggedIn) {
          const user = isLoggedIn.user;
          try {
            const result = await getFavoriteProperties(user);
            if (result.success) {
              setMyFavorites(result.favoriteProperties);
            }
            console.log(result.msg);
          } catch (e) {
            console.log(e);
          }
        } else {
          forceLogOut();
        }
      }
    }
    findMyFavorites();
  }, []);

  function forceLogOut() {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(setIsLoggedIn(false));
    dispatch(handleShowMyBids(false));
  }

  const setFinalStatusOff = async (status) => {
    console.log("bid status:", status);
    if (status <= 3) {
      setFinalStatus(false);
    }
  };

  const handleClickBid = (bid) => {
    const bidDetails = {
      bids: bid.mybids,
      bidCurrency: "SEK",
    };
    const plotDetails = {
      address: bid.address,
      // roomQuantity: 0,
      area: bid.premiumInfo?.area || "Unknown",
      areaUnits: "m²",
      plotArea: 0,
      plotAreaUnits: "m²",
      circumference: bid.premiumInfo?.circumference || "Unknown",
      district: bid.premiumInfo?.district || "Unknown",
      description: bid.description,
    };

    dispatch(populateBidDetails(bidDetails));
    dispatch(populatePlotDetails(plotDetails));
    dispatch(handleShowMyBids(false));
    dispatch(handleShowBidContainer(true));
  };

  const [switchToogle, setSwitchToogle] = useState(false);
  const [status, setBidStatus] = useState(1); //Status för vilket bid process, testa mellan 1-5
  const [saveBidId, setSaveBidId] = useState("");
  const [savePlotId, setSavePlotId] = useState("");

  function newBid() {
    dispatch(handleShowMyBids(false));
    dispatch(handleShowOverlay(false));
  }

  const props = { status };

  function checkFinalStatus(bid, status, saveBidId) {
    if (bid === saveBidId && status === 4) {
      return { height: "25rem", border: "4px solid #4CAD61" };
    } else if (bid === saveBidId && status === 5) {
      return { height: "34rem", background: "rgba(245, 245, 245, 0.5)" };
    } else if (bid === saveBidId) {
      return { height: "35.2rem" };
    } else if (status === 4) {
      return { border: "4px solid #4CAD61" };
    } else if (status === 5) {
      return { background: "rgba(245, 245, 245, 0.5)" };
    }
  }

  function checkFavoriteProperty(plot, savePlotId) {
    if (plot === savePlotId) {
      return { height: "25rem", border: "4px solid #4CAD61" };
    }
  }

  const [finalStatus, setFinalStatus] = useState(false);

  useEffect(() => {
    if (status === 4 || status === 5) {
      setFinalStatus(true);
    }
  }, []);

  /* function BiTrashMessage() {
    console.log("You have clicked the link to cancel bid [Nothing happend].");
  } */

  async function handleDeleteBid(bidId, bidData) {
    const confirmation = window.confirm(
      "Are you sure you want to cancel this bid? \n You will not be able to undo this!"
    );
    console.log(bidId)
    if (!confirmation) {
      return;
    }
    try {
      const result = await deleteBidAndAddInDeniedBids(bidId, bidData);
      console.log("Result:", result);
      window.alert(result.message)
      handleRemovedBid(bidId)
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemovedBid = (bidId) => {
    const indexBid = myBids.findIndex(({_id}) => _id === bidId)
    if(indexBid !== -1) {
      setMyBids([
        ...myBids?.slice(0, indexBid),
        ...myBids?.slice(indexBid + 1)
      ])
    }
    console.log(myBids)
  }

  return (
    <div className={styles.container}>
      <div
        className={
          switchToogle
            ? `${styles.greenBackground} ${styles.active}`
            : `${styles.greenBackground}`
        }></div>
      <label className={styles.navSwitch}>
        <div>{translations.navSwitchBids}</div>
        <div>{translations.navSwitchSaved}</div>
        <input
          type="checkbox"
          className={styles.checkBox}
          onClick={
            switchToogle
              ? () => {
                  setSwitchToogle(false);
                }
              : () => setSwitchToogle(true)
          }
        />
        <span
          className={styles.slider}
          language1={translations.navSwitchBids}
          language2={translations.navSwitchSaved}
        />
      </label>
      {switchToogle ? (
        <>
          {myFavorites ? (
            <div className={styles.body}>
              <ul className={styles.myBidsList}>
                {myFavorites.map((plot) => (
                  <li
                    className={styles.list}
                    key={plot._id}
                    onClick={
                      plot._id === savePlotId
                        ? () => setSavePlotId("")
                        : () => setSavePlotId(plot._id)
                    }
                    style={checkFavoriteProperty(plot._id, savePlotId)}>
                    <div className={styles.firstStage}>
                      <div>
                        <Image
                          src="/house.svg"
                          alt="houseImage"
                          width="50"
                          height="50"
                        />
                      </div>
                      <div className={styles.dropButton}>
                        <FavoriteButton property={plot}></FavoriteButton>
                      </div>
                      <div className={styles.bidShow}>
                        <p className={styles.address1}>{plot.address.street}</p>
                        <p className={styles.address2}>
                          {plot.address.postcode} {plot.address.city}{" "}
                          {plot.address.country}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {myBids ? (
            <div className={styles.body}>
              <ul className={styles.myBidsList}>
                {myBids.map((bid, i) => (
                  <li
                    className={styles.list}
                    key={bid._id}
                    onClick={() => {
                      if (bid._id === saveBidId) {
                        setSaveBidId("");
                      } else {
                        setSaveBidId(bid._id);
                        setBidStatus(bid.bidStatus);
                        setFinalStatusOff(bid.bidStatus);
                      }
                    }}
                    style={checkFinalStatus(bid._id, status, saveBidId)}>
                    <div className={styles.dropButton}>
                      <BiChevronDown
                        style={
                          bid._id === saveBidId
                            ? { transform: "rotate(180deg)" }
                            : null
                        }
                      />
                    </div>

                    <div className={styles.firstStage}>
                      <div>
                        <Image
                          src="/house.svg"
                          alt="houseImage"
                          width="50"
                          height="50"
                        />

                        {status === 4 ? (
                          <>
                            <div
                              className={styles.greenCheckMark}
                              style={{
                                position: "absolute",
                                left: "13px",
                                top: "8px",
                              }}>
                              <FaCheck
                                style={{
                                  color: "white",
                                  zIndex: "12",
                                  width: "16px",
                                  height: "16px",
                                }}></FaCheck>
                            </div>
                          </>
                        ) : null}
                      </div>

                      <div className={styles.bidShow}>
                        <p className={styles.address1}>{bid.address.street}</p>
                        <p className={styles.address2}>
                          {bid.address.postcode} {bid.address.city}{" "}
                          {bid.address.country}
                        </p>
                      </div>
                    </div>
                    {bid._id === saveBidId ? (
                      <>
                        <div className={styles.bidAmount}>
                          <Link href={" "}>{`${translations.yourBid}`}</Link>
                          <Link href=" ">{`${bid.amount}:- SEK`}</Link>
                          {/* <BiTrash onClick={BiTrashMessage}></BiTrash> */}
                          <h6 className={styles.cancelBid}>
                            Do you want to cancel bid? <br />
                            <a
                              href="#"
                              onClick={() => {
                                handleDeleteBid(bid._id, bid)}}>
                              Click here
                            </a>
                          </h6>
                        </div>

                        <div className={styles.line}></div>
                        {finalStatus ? (
                          <>
                            {status === 4 ? (
                              <>
                                <div className={styles.bidAccepted}>
                                  <div>
                                    <div className={styles.greenCheckMark}>
                                      <FaCheck
                                        style={{
                                          color: "white",
                                          zIndex: "2",
                                          width: "16px",
                                          height: "16px",
                                        }}
                                      />
                                    </div>
                                    <p>{translations.bidStatusHeader}</p>
                                  </div>

                                  <div>
                                    {" "}
                                    <span>
                                      {translations.bidStatusOperationCost}
                                    </span>
                                    2458 {translations.bidStatusMonthlyCost}
                                  </div>

                                  <div>
                                    {translations.bidStatusFloorPlan}
                                    <FiExternalLink
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        color: "black",
                                      }}></FiExternalLink>
                                  </div>

                                  <div>
                                    {translations.bidStatusMessageOwner}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className={styles.deniedBid}>
                                <div>{translations.bidStatusBidDenied}</div>

                                <div onClick={() => newBid()}>
                                  {translations.bidStatusPlaceNewBidBtn}
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <div className={styles.bidProgressHeader}>
                              {translations.bidStatusProgress}
                            </div>
                            <BidStep {...props} />
                          </>
                        )}
                      </>
                    ) : null}
                  </li>
                ))}
                <button className={styles.newBidBtn}>
                  <div onClick={() => newBid()}>
                    {translations.NewBidBtn} <span>+</span>
                  </div>
                </button>
              </ul>
            </div>
          ) : (
            <BiggerLoadingIcon />
          )}
        </>
      )}
    </div>
  );
}
