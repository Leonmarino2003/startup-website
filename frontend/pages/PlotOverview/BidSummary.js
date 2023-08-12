import Image from "next/image";
import React, { useEffect, useState } from "react";

import styles from "./BidSummary.module.css";
import {
  handleShowSignup,
  handleShowBidSuccess,
  handleShowPlaceBid,
  handleShowOverlay,
} from "../../redux/slices/componentSlice.js";
import {
  BiConversation,
  BiEraser,
  BiLock,
  BiFace,
  BiAbacus,
  BiPencil,
} from "react-icons/bi";
import { BsHouseDoorFill, BsPeople } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  placeBidInDB,
  placePendingBidInDB,
  verifyJWT,
} from "../../services/backendService";
import languagesJson from "../../languages.json";
import { fetchTilesetData } from "../../utilities/utils";
import { updateBid, shouldPostBid } from "../../redux/slices/bidSlice.js";
import { useRouter } from "next/router";
import BidSuccess from "../../components/bidsuccess";
import Layout from "../../components/Layout";

export default function BidSummary() {
  const dispatch = useDispatch();
  const router = useRouter();
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });

  const coords = useSelector((state) => {
    return state.map.coords;
  });
  const translations = languagesJson[languageToUse];

  const address = useSelector((state) => {
    return state.map.address;
  });

  const showBidSuccess = useSelector((state) => {
    return state.componentHandler.showBidSuccess;
  });

  console.log(showBidSuccess);

  const bidAmount = useSelector((state) => {
    return state.placeBid.bid.amount;
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const submitBidSummary = async (e) => {
    e.preventDefault();
    const isLoggedIn = await verifyJWT();
    const data = new FormData(e.target);

    const bid = data.get("bid");

    /*  const comment = data.get("comment"); */
    console.log(bidAmount, ":- kr");
    if (isLoggedIn) {
      if (isLoggedIn.loggedIn) {
        const premiumInfo = await fetchTilesetData(coords);
        const bidObj = {
          bid: {
            address: address,

            amount: bidAmount.replace(/ +/g, ""),
          },
          premiumInfo: premiumInfo,
          user: isLoggedIn.user,
          /*  message: comment, */
        };

        const data = await placePendingBidInDB(bidObj);

        if (data.success) {
          const resetBid = {
            bid: null,
            address: {},
          };
          dispatch(updateBid(resetBid));
          /*   setIsLoading(false);
              dispatch(handleShowPlaceBid(false)); */
          dispatch(handleShowOverlay(true));
          dispatch(handleShowBidSuccess(true));
        }
        if (!data.success) {
          setError(data.errorMsg);
          setTimeout(() => {
            setError("");
          }, 3000);
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <>
      {showBidSuccess && <BidSuccess />}

      {/*  Main block */}
      <div className={styles.mainBox}>
        <div className={styles.flexColumn}>
          <div className={styles.imgContainer}>
            <Image
              width={100}
              height={100}
              alt=""
              src="/property.png"
              id="placebidMapPin"
            />
          </div>
        </div>

        <div className={styles.bidProcess}>
          <div className={styles.youAreCloseToBid}>
            <p>{translations.youAreCloseToBid}</p>
          </div>
          <div className={styles.adressBox}>
            <h3 className={`${styles.bidAddress}`}>{address.street}</h3>

            <section className={styles.addressFrame}>
              <p className={styles.bidParagraph}>
                {address.country} {">"} {address.postcode} {">"} {address.city}
              </p>
              <br />
            </section>
          </div>
          <div className={styles.bidAmountIs}>
            <p>{translations.bidAmountIs}</p>
            <h1>{bidAmount ? bidAmount : "Success!!"}</h1>
          </div>

          <div className={styles.checkBox}>
            <input
              type="checkbox"
              name="checkBoxText"
              onChange={() => setChecked(!checked)}
              checked={checked}
            />
            <label>Untick to view bid info</label>
          </div>
          {checked ? (
            <div></div>
          ) : (
            <div>
              <div className={styles.safePurchase}>
                <div className={styles.about}>
                  <h2>{translations.aSafePurchase}</h2>
                  <ul>
                    <li>
                      {" "}
                      <BiAbacus size={20} /> You&apos;re <b>never</b> bound to
                      buy the property you bid on.
                    </li>
                    <li>
                      {" "}
                      <BiConversation size={20} /> The bid is made as proposal{" "}
                      <b>only</b>.
                    </li>
                    <li>
                      {" "}
                      <BsPeople size={20} /> How you proceed is up to you and
                      the <b>land owner</b>
                    </li>
                    <li>
                      {" "}
                      <BiEraser size={20} /> Change your mind{" "}
                      <b>at any step </b> in the bid process.
                    </li>
                    <li>
                      {" "}
                      <BiFace size={20} />
                      The land owner can <b>accept</b> or <b>deny</b> your bid
                      proposal.
                    </li>
                    <li>
                      {" "}
                      <BiPencil size={20} /> Add an <b>optional</b> comment to
                      make your bid stand out.
                    </li>
                    <li>
                      {" "}
                      <BiLock size={20} /> Your data is <b>always</b> secured
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        <form
          className={styles.bidSummaryForm}
          onSubmit={(event) => submitBidSummary(event)}>
          <section className={styles.buttonSection}>
            {/*  <div className={styles.groupButtons}> */}
            {/* <div className={styles.buttons}> */}
            <button
              title={translations.reset.toUpperCase()}
              className="submitBtn"
              type="reset"
              style={{
                backgroundColor: "#393939",
                color: "#fff",
              }}>
              {translations.reset}
            </button>

            <button
              className={`${"dark-green"}`}
              type="Next">
              {translations.placeBidBtn}
            </button>
          </section>
        </form>
      </div>
    </>
  );
}

BidSummary.getLayout = function getLayout(bidSummary) {
  return <Layout>{bidSummary}</Layout>;
};
