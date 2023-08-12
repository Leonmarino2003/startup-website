import ComponentHandler from "../../components/componenthandler.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeLanguage } from "../../redux/slices/userSlice";
import style from "../../styles/Home.module.css";
import { handleShowResetPassword } from "../../redux/slices/componentSlice";
import Layout from "../../components/Layout.js";


function ResetPass() {
  const dispatch = useDispatch();
  dispatch(handleShowResetPassword(true));

  useEffect(() => {
    let savedLanguage;
    async function hasSavedLanguage() {
      savedLanguage = await fetchDisplayLanguage();
      if (savedLanguage) {
        dispatch(changeLanguage(savedLanguage));
      }
    }
    hasSavedLanguage();
  });

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
      </div>
    </>
  );
}
ResetPass.getLayout = function getLayout(resetpass) {
  return <Layout>{resetpass}</Layout>;
};

export default ResetPass;
