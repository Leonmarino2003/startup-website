import styles from "./PendingBids.module.css"
import classes from "./ShowAllBids.module.css";
const ShowBidRecords = ({data}) => {

    const handleBidStatus = (value) => {
        // converts the bid status from numbers to their message counterpart
        let activeStatus = "";
        if (value?.bidStatus === 1) {
          activeStatus = "Pending";
        } else if (value?.bidStatus === 2) {
          activeStatus = "Accepted";
        } else if (value?.bidStatus === 5) {
          activeStatus = "Rejected";
        } else if (value?.bidStatus === 4) {
          activeStatus = "Won"
        }
          return activeStatus;
        
      };
      const handleStyleStatus = () => { // shows css style of current set status
        //showing what its current set states from handleBidStatus function is 
        if(handleBidStatus(data)  === "Pending"){
          return classes.PendingStatusBox
        } else if(handleBidStatus(data) === "Accepted"){
          return classes.AcceptedStatusBox
        } else if(handleBidStatus(data)  === "Rejected"){
          return classes.DeniedStatusBox
        } else if(handleBidStatus(data) === "Won"){
          return classes.WonStatusBox
        }
      }

    
    return (<>
         <tr className={styles.rows}>
          <td style={{padding: "3rem 3rem"}}>{data.amount}</td>
          <td>{new Date(data.address.bidDate).toLocaleDateString()}</td>
          <td><div className={handleStyleStatus()}>{handleBidStatus(data)}</div></td>
          </tr>
    </>)

}

export default ShowBidRecords