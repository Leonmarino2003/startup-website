import React from "react";
import classes from "./ChangeLayer.module.css";

function ChangeLayer({ changeMapLayer, layers }) {
  return (
    <div className={classes.container}>
      {layers.map((layer, index) => {
        return (
          <div
            className={classes.layer}
            key={layer.id}
            onClick={() => {
              if (layer.selected) return;
              changeMapLayer(layer, index);
            }}>
            {layer.selected ? (
              <p className={classes.selected}>{layer.name}</p>
            ) : (
              <p>{layer.name}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ChangeLayer;
