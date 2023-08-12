import ComponentHandler from "./componenthandler";
// import Footer from "./Footer/Footer";
import TopNav from "./topNav";
import styles from "./Layout.module.css";
import { useRouter } from "next/router";
import Greenspace from "./Greenspace/Greenspace";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Footer from "./Footer/Footer";


const Layout = ({ children, leftAligned, hasFooter = true }) => {

  const router = useRouter();

  return (
    <div className={styles.surroundingContainer}>
      <Provider store={store}>
        <TopNav />
        <ComponentHandler />
        <Greenspace />
        <main
          className={
            router.pathname === "/" ? styles.test : styles.surroundAllPages
          }
          style={{
            margin: leftAligned ? 0 : "",
          }}>
          {children}
        </main>
        <Footer displays={hasFooter} ></Footer>
      </Provider>

    </div>
  );
};

export default Layout;
