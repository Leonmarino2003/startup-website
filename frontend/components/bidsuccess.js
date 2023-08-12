import styles from "./bidsuccess.module.css";
import { useDispatch, useSelector } from "react-redux";
import { hideAll } from "../redux/slices/componentSlice.js";
import languagesJson from "../languages.json";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";

export default function BidSuccess() {
  const dispatch = useDispatch();
  const router = useRouter();
  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  const showMyBids = useSelector((state) => {
    return state.componentHandler.showMyBids;
  });

  const goToMyBids = () => {
    dispatch(hideAll());
    router.push("../bids");
  };

  return (
    <>
      {" "}
      {/* {showMyBids && <MyBids />}  */}
      <main className={styles.mainSection}>
        <div className={styles.leftCorner}></div>
        <div className={styles.rightCorner}></div>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>{translations.ThankYouForBid}</h2>
          <p className={styles.subTitle}>{translations.BidHasBeenPlaced}</p>
          <div
            className={styles.greenCheckMark}
            style={{
              margin: "0 auto",
            }}>
            <FaCheck
              style={{
                color: "white",
                zIndex: "12",
                width: "16px",
                height: "16px",
              }}></FaCheck>
          </div>

          <div className={styles.bottomSection}>
            <h5>
              {translations.ForFurtherDetails}
              <button onClick={goToMyBids}>My Bids</button>
            </h5>
            <h5>
              {translations.CancelYourBid}
              <button onClick={goToMyBids}>My Bids</button>
            </h5>
          </div>
          <Link href="/">
            <button
              style={{ color: "black" }}
              onClick={() => {
                dispatch(hideAll());
              }}>
              {translations.backMap}
            </button>
          </Link>
        </div>
      </main>
      <div className={styles.background}></div>
    </>
  );
}
