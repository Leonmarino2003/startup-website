import { useRouter } from "next/router";
import styles from "./Greenspace.module.css";

const Greenspace = () => {
  const router = useRouter();

  return (
    <div
      className={
        router.pathname === "/" ? styles.hideStripe : styles.greenStripe
      }></div>
  );
};

export default Greenspace;
