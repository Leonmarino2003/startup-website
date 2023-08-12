import styles from "./adminOutput.module.css";

const BidsComponent = ({ data }) => {
  return (
    <>
      {!data ? (
        <div>No active bids currently.</div>
      ) : (
        <div
          className={styles.main}
          key={data._id}>
          <li>
            <b>Id:</b> {data._id}
          </li>
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
              </ul>
            </div>
          ) : (
            <div>
              {" "}
              <b>No Address</b>{" "}
            </div>
          )}
          {data.bidders ? (
            <div key={data._id}>
              <b>Bids:</b>

              {data.bidders?.map((bidders, index) => {
                return (
                  <ul key={index}>
                    <li>{/* <p>_id: {bidders._id}</p> */}</li>
                    <li>
                      <b> From user:</b> {bidders.user} <br />
                    </li>
                    <li>
                      <b>Amount:</b> {bidders.amount}
                    </li>
                  </ul>
                );
              })}
            </div>
          ) : (
            <div>
              {" "}
              <b>No Bids</b>{" "}
            </div>
          )}
          {data.stats ? (
            <div>
              <b>Stats:</b>
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
              <b> No Stats Availible</b>
            </div>
          )}
          {data.premiumInfo ? (
            <div>
              <b>Premium Info:</b>
              <ul>
                <li>
                  <b>District:</b> {data.premiumInfo.disctrict}
                </li>
                <li>
                  <b>Area: </b>
                  {data.premiumInfo.area}
                </li>
                <li>
                  <b>Circumference:</b> {data.premiumInfo.circumference}
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default BidsComponent;
