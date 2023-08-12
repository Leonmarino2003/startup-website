import styles from "./adminOutput.module.css";
import {
  confirmPendingBidById,
  deletePendingBidById,
  _getUser,
} from "../../../services/backendService";

const PendingBids = ({ data }) => {
  const handleDeny = async (pendingBidId) => {
    const confirmation = window.confirm(
      "Are you sure you want to deny this bid? \n You will not be able to undo this!"
    );
    if (!confirmation) {
      return;
    }
    try {
      const result = await deletePendingBidById(pendingBidId);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = async (pendingBidId) => {
    const confirmation = window.confirm(
      "Are you sure you want to confirm this bid? \n You will not be able to undo this!"
    );
    if (!confirmation) {
      return;
    }
    try {
      const result = await confirmPendingBidById(pendingBidId);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!data ? (
        <div>No active bids currently.</div>
      ) : (
        <div className={styles.main}>
          <button
            className={styles.deny}
            onClick={() => handleDeny(data._id)}>
            DENY
          </button>
          <button
            className={styles.confirm}
            onClick={() => handleConfirm(data._id)}>
            CONFIRM
          </button>

          <li>
            <b>Id:</b> {data._id}
          </li>

          <li>
            <h3>Contact Informations</h3>
          </li>
          <ul>
            {/* {console.log(data)} */}
            <li>
              <b>From User (id):</b> {data.user}
            </li>
            <li>
              <b>Name:</b> {data.userFirstName} {data.userLastName}
            </li>
            <li>
              <b>Gender: </b> {data.gender}
            </li>
            <li>
              <b>Born:</b>Y{data.year} M{data.month}, D{data.day}
            </li>
            <li>
              <b>Email: </b>
              {data.userEmail}
            </li>

            <li>
              <b>PhoneNumber:</b>
              {data.phone}
            </li>

            <br />
          </ul>
          {/* {console.log(data)} */}
          {data.address ? (
            <div>
              <b>Address:</b>
              <ul>
                <li>
                  <b>Country:</b> {data.address.country} <br />
                </li>
                <li>
                  <b>City:</b> {data.address.city} <br />
                </li>
                <li>
                  <b>Street:</b> {data.address.street} <br />
                </li>
                <li>
                  <b>Zip:</b> {data.address.postcode} <br />
                </li>
                <li>
                  <b>Bid amount:</b> {data.amount} <br />
                </li>
                <li>
                  <b>Bid status:</b> {data.bidStatus} <br />
                </li>
              </ul>
            </div>
          ) : (
            <div> No Address </div>
          )}

          {data.stats ? (
            <div>
              <b> Stats:</b>
              <ul>
                <li>
                  <b>Views:</b> {data.stats.views}
                </li>
                <li>
                  <b>Clicks:</b> {data.stats.clickViews}
                </li>
              </ul>
            </div>
          ) : (
            <div>
              {}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PendingBids;
