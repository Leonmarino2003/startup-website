import styles from "./BidConfirmation.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import languagesJson from "../../languages.json";
import BidStep from "../../components/myBidsComponents/BidStep";
import Image from "next/image";
import {
  handleShowMyBids,
  handleShowOverlay,
} from "../../redux/slices/componentSlice";

import { useRouter } from "next/router";
import { BiRightArrowAlt } from "react-icons/bi";

export default function BidConfirmation() {
  const dispatch = useDispatch();

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  const router = useRouter();
  function showMyBids() {
    dispatch(handleShowMyBids(true));
    dispatch(handleShowOverlay(true));
  }

  const [status, setBidStatus] = useState(1); //Status för vilket bid process, testa mellan 1-5

  const props = { status };

  return (
    <div className={styles.body}>
      <div className={`${styles.greenBackground}`}></div>

      <div className={styles.mainBox}>
        <div className={styles.imgContainer}>
          <Image
            width={100}
            height={100}
            alt=""
            src="/property.png"
            id="placebidMapPin"
          />
        </div>

        <div className={styles.BidPlaced}>{translations.BidHasBeenPlaced}</div>

        <div className={styles.ImgAndLinks}>
          <div className={styles.ImgAndText}>
            <Image
              alt=""
              src="/Damen.svg"
              width="200"
              height="100"
              objectFit="fit"
              quality={100}
            />
            <div className={styles.BidProgress}>
              {translations.bidStatusProgress}
            </div>
          </div>
          <div className={styles.goToMyBids}>
            <div className={styles.goToMyBidsInline1}>
              <p>
                {" "}
                Go to <b>My Bids. </b>
              </p>
              <BiRightArrowAlt size={20} />
            </div>
            <div className={styles.goToMyBidsInline2}>
              <p> Back to map</p>
              <BiRightArrowAlt size={20} />
            </div>
          </div>
        </div>

        <div className={styles.bidStatusProgress}>
          <BidStep {...props} />
          <div className={styles.RightBlock}>
            <p>You can track you progress in “My bids”</p>
            <p>Do you want to cancel your bid? Click here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
