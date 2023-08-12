import ComponentHandler from "../components/componenthandler.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeLanguage } from "../redux/slices/userSlice";
import style from "../styles/Home.module.css";
import { handleShowMyBids } from "../redux/slices/componentSlice";
import Layout from "../components/Layout.js";

function Bids() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleShowMyBids(true));

    let savedLanguage;
    async function hasSavedLanguage() {
      savedLanguage = await fetchDisplayLanguage();
      if (savedLanguage) {
        dispatch(changeLanguage(savedLanguage));
      }
    }
    hasSavedLanguage();

    return () => {
      dispatch(handleShowMyBids(false)); // Turn off showMyBids when leaving the component
    };
  }, [dispatch]);

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

  return (
    <>
      <div className={style.container}>
        {/*componenthandler duplicated all components on bid page when added here */}
        {/*<ComponentHandler />*/}
      </div>
    </>
  );
}

Bids.getLayout = function getLayout(bids) {
  return <Layout>{bids}</Layout>;
};
export default Bids;
