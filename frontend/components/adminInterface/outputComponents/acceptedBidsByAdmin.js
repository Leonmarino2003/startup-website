import styles from "./adminOutput.module.css";
import { updateBidStatuses, _getUser } from "../../../services/backendService";

const AcceptedBidsByAdmin = ({ data }) => {
  const handleUpdateBid = async () => {
    const { _id } = data;

    const processStarted = document.querySelector(
      `#processStarted[name="checkbox ${_id}"]`
    )?.checked;
    const contactOwnerCheckBox = document.querySelector(
      `#contactOwner[name="checkbox ${_id}"]`
    )?.checked;
    const contactOwnerMessage = document.querySelector(
      `#contactMessage[name="textarea ${_id}"]`
    )?.value;
    const ownerAcceptCheckBox = document.querySelector(
      `#ownerAccept[name="checkbox ${_id}"]`
    )?.checked;
    const ownerAcceptMessage = document.querySelector(
      `#ownerAcceptMessage[name="textarea ownerAccept ${_id}"]`
    )?.value;
    const refuseMessage = document.querySelector(
      `#refuseMessage[name="textarea ${_id}"]`
    )?.value;

    const updateData = {
      bidStatuses: {
        processStarted,
        contactOwner: {
          checkBox: contactOwnerCheckBox,
          message: contactOwnerMessage,
        },
        ownerAccept: {
          checkBox: ownerAcceptCheckBox,
          message: ownerAcceptMessage,
        },
        refuseMessage,
      },
    };
    await updateBid(updateData);
  };

  const updateBid = async (updateData) => {
    try {
      const response = await updateBidStatuses(data._id, updateData);
      return response.data;
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
              <ul>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      id="processStarted"
                      name={`checkbox ${data._id}`}
                      value={data.bidStatuses.processStarted}
                    />
                    Process started?
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      id="checkBox"
                      name={`checkbox ${data._id}`}
                      value={data.bidStatuses.contactOwner.checkBox}
                    />
                    Were you able to contact the owner?
                  </label>
                  <label>
                    <span className="placeholder">
                      Information about owner.
                    </span>
                    <textarea
                      className="inputField"
                      id="contactMessage"
                      name={`textarea ${data._id}`}
                      type="text"
                      required></textarea>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      id="checkbox"
                      name={`checkbox ${data._id}`}
                      value={data.bidStatuses.ownerAccept?.checkbox || false}
                    />
                    Did owner accept?
                  </label>
                  <br></br>
                  <label>
                    <span className="placeholder">
                      Did owner accept? If not why.
                    </span>
                    <textarea
                      className="inputField"
                      id="acceptMessage"
                      name={`textarea ownerAccept ${data._id}`}
                      type="text"
                      required></textarea>
                  </label>
                </li>
                <li>
                  <label>
                    <span className="placeholder">
                      Reason if offer was refused (for user)
                    </span>
                    <textarea
                      className="inputField"
                      id="refuseMessage"
                      name={`textarea ${data._id}`}
                      type="text"
                      required></textarea>
                  </label>
                </li>
                <button
                  type="button"
                  onClick={() => {
                    const checkboxProcessStarted =
                      document.getElementById("processStarted");
                    const checkboxContactOwner =
                      document.getElementById("checkBox");
                    const inputContactMessage =
                      document.getElementById("contactMessage");
                    const checkboxOwnerAccept =
                      document.getElementById("checkbox");
                    const inputAcceptMessage =
                      document.getElementById("acceptMessage");
                    const inputRefuseMessage =
                      document.getElementById("refuseMessage");

                    const updatedBid = {
                      _id: data._id,
                      bidStatuses: {
                        processStarted: checkboxProcessStarted.checked,
                        contactOwner: {
                          checkBox: checkboxContactOwner.checked,
                          message: inputContactMessage.value,
                        },
                        ownerAccept: {
                          checkBox: checkboxOwnerAccept.checked,
                          message: inputAcceptMessage.value,
                        },
                        refuseMessage: inputRefuseMessage.value,
                      },
                    };

                    handleUpdateBid(updatedBid);
                  }}>
                  Submit
                </button>
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AcceptedBidsByAdmin;
