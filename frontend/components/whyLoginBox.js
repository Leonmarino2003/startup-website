import styles from "./login.module.css";
import { useDispatch } from "react-redux";
import { handleShowWhyLogInBox } from "../redux/slices/componentSlice";
import { CgClose } from "react-icons/cg";

const WhyLoginBox = () => {
  const dispatch = useDispatch();

  return (
    <div className={`${"component-frame"} ${styles.whyLogInContainer}`}>
      <div className={styles.topLeftCircle}></div>
      <CgClose
        className={styles.closeButton}
        size={32}
        onClick={() => {
          dispatch(handleShowWhyLogInBox(false));
        }}
      />
      <p>
        In many online auction or bidding websites, users are required to log in
        to place a bid for several reasons, including:
      </p>
      <p>
        <b>1.</b> Verification of identity: Logging in allows the website to
        verify that the person placing a bid is a real person and not an
        automated system or impersonator.
      </p>
      <p>
        <b>2.</b> Bid tracking: By requiring users to log in, the website can
        track the bids of each user and ensure that bidding is fair and
        transparent.
      </p>
      <p>
        <b>3.</b> Bid history: When a user logs in, the website can keep a
        record of their bid history, making it easier for them to keep track of
        the items they have bid on and the status of those bids.
      </p>
      <p>
        <b>4.</b> User information: Logging in also allows the website to access
        important user information, such as their contact details and payment
        information, which is required to complete a transaction if the user
        wins the auction.
      </p>
      <div className={styles.bottomRightCircle}></div>
    </div>
  );
};

export default WhyLoginBox;
