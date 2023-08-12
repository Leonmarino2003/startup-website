import classes from "./MapButtons.module.css";
import { useDispatch } from "react-redux";
import { BiZoomIn, BiZoomOut, BiLayer, BiCurrentLocation } from "react-icons/bi";
import { handleShowLayerChanger } from "../redux/slices/mapSlice";

function MapButtons({ map }) {
  const dispatch = useDispatch();

  function handleZoomIn() {
    map.zoomIn({ duration: 500 });
  }

  function handleZoomOut() {
    map.zoomOut({ duration: 500 });
  }

  const onGeolocateClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Center the map on the user's geolocation
          map.flyTo({
            center: [longitude, latitude],
            zoom: 18,
          });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } 
  };

  return (
    <>
      <div className={classes.buttonContainer}>
        <button onClick={handleZoomIn}>
          <BiZoomIn className={classes.icon} />
        </button>
        <button onClick={handleZoomOut}>
          <BiZoomOut className={classes.icon} />
        </button>
      </div>
      <button
        className={classes.layers}
        onClick={() => {
          dispatch(handleShowLayerChanger(true));
        }}>
        <BiLayer className={classes.icon} />
      </button>
      <button
        className={classes.locate}
        onClick={onGeolocateClick}>
        <BiCurrentLocation className={classes.icon} />
      </button>
    </>
  );
}

export default MapButtons;
