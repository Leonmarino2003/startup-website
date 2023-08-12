import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import * as geolib from "geolib";
import classes from "./Mapbox.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  showNewPin,
  updateCoordinates,
  updateAddress,
  handleShowLayerChanger,
  updatePlotlineChunk,
  cachePlotlineChunks,
  addSource,
  disableSource,
  removePlotLineChunk,
} from "../redux/slices/mapSlice";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapButtons from "./MapButtons";
import languagesJson from "../languages.json";
import ChangeLayer from "./ChangeLayer";
import {
  handleShowPlaceBid,
  handleShowBidHelp,
  handleShowRegisterModal,
  handleShowSearchPopUp,
  hideAll,
} from "../redux/slices/componentSlice.js";
import { fetchFilter } from "../services/filterService.js";
import { fetchAddress } from "../services/fetchService";
import { sendRectangleBounds } from "../services/backendService";
import { store } from "../redux/store";
import Supercluster from 'supercluster';


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MB_ACCESS_TOKEN;

function Mapbox({ lat, lng }) {
  const dispatch = useDispatch();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef();
  const router = useRouter();
  const [zoom, setZoom] = useState(12);
  const [isloading, setIsLoading] = useState(false);
  const [markerLat, setMarkerLat] = useState(null);
  const [markerLng, setMarkerLng] = useState(null);
  const [mapLayers, setMapLayers] = useState([
    {
      name: "Frank",
      source: "mapbox://styles/liastartup/cl2itih68001314p9m3r7nm1r",
      id: 1,
      selected: true,
    },
    {
      name: "Satellite",
      source: "mapbox://styles/liastartup/cl3sjoh2q000114o32xtekahx",
      id: 2,
      selected: false,
    },
    {
      name: "Blueprint",
      source: "mapbox://styles/liastartup/cl2itjm31001e14mkn2z81w7e",
      id: 3,
      selected: false,
    },
  ]);

  const geocoderRef = useRef(null);

  const geocoder = useRef(null);

  const placedPin = useSelector((state) => {
    return state.map.placedPin;
  });

  const showLayerChanger = useSelector((state) => {
    return state.map.showLayerChanger;
  });

  const registerPlot = useSelector((state) => state.map.registerPlotView);

  let previousIds = {};

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });

  const translations = languagesJson[languageToUse];

  useEffect(() => {
    if (map.current) return; // initialize map only once
    const bounds = [
      [11.593676, 57.542908], // SW point of bounds
      [12.346266, 57.920244], // NE point of bounds
    ];
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapLayers[0].source,
      projection: "mercator",
      // center: [lng, lat], // Coordinates based on where you are located...
      center: [13.000560450144604, 55.604938086311364], // Initialize coordinates to start in Malmö
      zoom: zoom,
      // maxBounds: bounds // confine the map to a specified 'box' in which the user can navigate in.
    });
    /*if ("geolocation" in navigator) {
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          fitBoundsOptions: {
            maxZoom: 18,
            zoom: 18,
          },
          showAccuracyCircle: false,
          trackUserLocation: true,
          showUserHeading: true,
        })
      );
    }*/

    geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: translations.geocoderPlaceholder,
      mapboxgl,
    });

    geocoder.current.on("result", closeSearchBar);
    geocoderRef.current.appendChild(geocoder.current.onAdd(map.current));

    map.current.on("click", getCoordinatesOnClick);
    map.current.on("dragend", getPlotlinesOnDrag);
  }, []);

  function getHouseCentroids(features) {
    // Calculate the centroid for each house polygon
    return features.map((feature) => {
      const coordinates = feature.geometry.coordinates[0]; // Get the coordinates of the outer ring
      const centroid = coordinates.reduce(
        (acc, [lng, lat]) => [acc[0] + lng, acc[1] + lat],
        [0, 0]
      );
      const numPoints = coordinates.length;
      centroid[0] /= numPoints;
      centroid[1] /= numPoints;
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: centroid,
        },
        properties: {},
      };
    });
  }

  function removePreviousDots(dotSourceId, layerCircleId, numberLayerId ){
    if (previousIds.layerCircleId) {
      map.current.removeLayer(previousIds.layerCircleId);
    }
    if (previousIds.numberLayerId) {
      map.current.removeLayer(previousIds.numberLayerId);
    }
    if (previousIds.dotSourceId) {
      map.current.removeSource(previousIds.dotSourceId);
    }
    previousIds = {
      layerCircleId,
      dotSourceId,
      numberLayerId,
    };
  }

  function addDotMapLayer(map, dotSourceId, layerCircleId, dotData) {
    const zoom = map.getZoom();
    if (zoom>15){
      //console.log("zoom", zoom)
      removePreviousDots(null, null, null);
      return;
    }
    const bounds = map.getBounds();
    const numberLayerId = `${layerCircleId}-count`;


    const cluster = new Supercluster({
      radius: 40, 
      maxZoom: 15, 
    });
    
    cluster.load(
      dotData.map((feature) => ({
        type: 'Feature',
        properties: feature.properties,
        geometry: {
          type: 'Point',
          coordinates: feature.geometry.coordinates,
        },
      }))
    );
  
    // Get the clusters or points based on the current zoom level and map bounds
    const clustersOrPoints = cluster.getClusters(
      [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],
      Math.floor(zoom),
    );
      
    
    
    map.addSource(dotSourceId, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: clustersOrPoints.map((clusterPoint) => ({
          type: "Feature",
          properties: {
            point_count: clusterPoint.properties.point_count,
          },
          geometry: {
            type: "Point",
            coordinates: clusterPoint.geometry.coordinates,
          },
        })),
      },
    });

    map.addLayer({
      id: layerCircleId,
      type: "circle",
      source: dotSourceId,
      paint: {
        "circle-color": "#4cad61",
        "circle-radius": [
          "case",
          ["<", ["get", "point_count"], 100],
          10, 
          15,
        ], 
      },
    });

    map.addLayer({
      id: numberLayerId, 
      type: "symbol",
      source: dotSourceId,
      layout: {
        "text-field": "{point_count}",
        "text-font": ["Arial Unicode MS Bold"],
        "text-size": 12,
        "text-offset": [0, 0],
        "text-anchor": "center",
      },
      paint: {
        "text-color": "#000000", 
      },
    });

    removePreviousDots(dotSourceId, layerCircleId, numberLayerId );
    
    map.setLayerZoomRange(layerCircleId, 5, 15);
    map.setLayerZoomRange(numberLayerId, 5, 15);
  }
  
  function addPlotlineMapLayer() {
    if (map.current) {
      let hoveredPlotId = null;
      let chunk = store.getState().map.plotlineChunk;
      let cacheKey = chunk.id; // get newest id item in memory
      let sourceId = `source-${cacheKey}`;
      let layerLineId = `layer-line-${cacheKey}`;
      let layerFillId = `layer-fill-${cacheKey}`;
      let layerCircleId = `layer-circle-${cacheKey}`;
      let dotSourceId = `source-dots-${cacheKey}`;
      const loadedSources = store.getState().map.sourceCache;
      const dotData = getHouseCentroids(chunk.data);

      const result = loadedSources.some((source) => source === sourceId);
      if (result) {
        console.log(`source '${sourceId}' already loaded.`);
        //addDotMapLayer(map.current, dotSourceId, layerCircleId, dotData);
        return;
      }

      map.current.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: chunk.data, // get newest data item in memory
        },
        generateId: true,
      });

      map.current.addLayer({
        id: layerLineId,
        type: "line",
        source: sourceId,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#4cad61",
          "line-width": 2,
        },
      });

      map.current.addLayer({
        id: layerFillId,
        type: "fill",
        source: sourceId,
        layout: {},
        paint: {
          "fill-color": "#4cad61",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1,
            0,
          ],
        },
      });

      addDotMapLayer(map.current, dotSourceId, layerCircleId, dotData);


      map.current.on("mousemove", layerFillId, (e) => {
        if (e.features.length > 0) {
          if (hoveredPlotId !== null) {
            map.current.setFeatureState(
              {
                source: sourceId,
                id: hoveredPlotId,
              },
              { hover: false }
            );
          }
          hoveredPlotId = e.features[0].id;
          map.current.setFeatureState(
            {
              source: sourceId,
              id: hoveredPlotId,
            },
            { hover: true }
          );
        }
      });

      map.current.on("mouseleave", layerFillId, () => {
        if (hoveredPlotId !== null) {
          map.current.setFeatureState(
            { source: sourceId, id: hoveredPlotId },
            { hover: false }
          );
        }
        hoveredPlotId = null;
      });

      map.current.setLayerZoomRange(layerLineId, 15, 20); // layers are only visible between zoom levels 15-20
      map.current.setLayerZoomRange(layerFillId, 15, 20);
      //map.current.setLayerZoomRange(layerCircleId, 0, 100);
      dispatch(addSource(sourceId));
    }
  }

  function removeFarawaySources(bounds) {
    const loadedSources = store.getState().map.sourceCache;
    let datasetCache = store.getState().map.plotlineChunkCache;

    const [minLng, minLat, maxLng, maxLat] = bounds;
    const diagonalLength = geolib.getDistance({ latitude: maxLat, longitude: minLng }, { latitude: minLat, longitude: maxLng });
    let maxDistanceInMeters = 2*diagonalLength;
    const center = {
      latitude: (bounds[1] + bounds[3]) / 2,
      longitude: (bounds[0] + bounds[2]) / 2,
    };

    datasetCache.forEach((cacheKey) => {
      let currentBounds = cacheKey.id.split(";").map((value) => parseFloat(value));
      let currentSourceId = `source-${cacheKey.id}`;
      let currentLineLayerId = `layer-line-${cacheKey.id}`;
      let currentFillLayerId = `layer-fill-${cacheKey.id}`;

      if (!loadedSources.includes(currentSourceId)) {
        return;
      }

      const currentCenter = {
        latitude: (currentBounds[1] + currentBounds[3]) / 2,
        longitude: (currentBounds[0] + currentBounds[2]) / 2,
      };
      

      let distance = geolib.getDistance(center, currentCenter);

      if (
        distance > maxDistanceInMeters &&
        map.current.getLayer(currentLineLayerId && currentFillLayerId)
      ) {
        console.log(
          `removing dataset with id ${cacheKey.id}, it was ${distance} meters away.`
        );
        map.current.removeLayer(currentLineLayerId);
        map.current.removeLayer(currentFillLayerId);
        map.current.removeSource(currentSourceId);
        dispatch(disableSource(currentSourceId));
        dispatch(removePlotLineChunk(cacheKey.id));
      }
    });
  }

  async function getPlotlinesOnDrag() {
    const zoom = map.current.getZoom();
    if (zoom < 5){
      return; 
    }

    if (map.current && isloading === false) {
      setIsLoading(true);

      const bounds = map.current.getBounds();
      const { lng: minLng, lat: minLat } = bounds.getSouthWest();
      const { lng: maxLng, lat: maxLat } = bounds.getNorthEast();
      const roundedMinLng = Math.floor(minLng * 100) / 100;
      const roundedMinLat = Math.floor(minLat * 100) / 100;
      const roundedMaxLng = Math.ceil(maxLng * 100) / 100;
      const roundedMaxLat = Math.ceil(maxLat * 100) / 100;
      const boundsArray = [roundedMinLng, roundedMinLat, roundedMaxLng, roundedMaxLat];
      const datasetId = boundsArray.join(";");

      let datasetCache = store.getState().map.plotlineChunkCache;

      if (datasetCache.find((item) => item.id == datasetId)) {
        //console.log(datasetId, "in cache");
        addPlotlineMapLayer();
        return;
      } else {
        //console.log(datasetId, "fetching new data from DB");
        const filteredPlotlines = await sendRectangleBounds(boundsArray);
        dispatch(updatePlotlineChunk({ boundsArray, filteredPlotlines}));
        dispatch(cachePlotlineChunks(store.getState().map.plotlineChunk));
        addPlotlineMapLayer();
        removeFarawaySources(boundsArray);
      }
      setIsLoading(false);
    }
  }

  function findPlot(result, chunks) {
    const pointLat = result.query[1];
    const pointLng = result.query[0];
    const chunk = chunks[0].map((item) => item.geometry.coordinates[0]);

    let polygon = chunk.map((item) => {
      return item.map((number) => {
        return {
          latitude: number[1],
          longitude: number[0],
        };
      });
    });
    const foundPlot = polygon.map((item) =>
      geolib.isPointInPolygon({ latitude: pointLat, longitude: pointLng }, item)
    );

    if (foundPlot.includes(true)) {
      return true;
    } else {
      return false;
    }
  }

  async function getCoordinatesOnClick(e) {
    const coords = {
      lng: e.lngLat.lng,
      lat: e.lngLat.lat,
    };

    const result = await fetchAddress(coords);
    dispatch(updateCoordinates({ coords }));
    const filterResult = fetchFilter(result);
    if (!filterResult) {
      const chunks = store
        .getState()
        .map.plotlineChunkCache.map((item) => item.data);
      if (chunks && chunks.length > 0) {
        const foundPlot = findPlot(result, chunks);
        if (foundPlot === true) {
          zoomToMarker(e);
          saveAddress(result);
          //placeMarker(coords);
          setMarkerLat(coords.lat);
          setMarkerLng(coords.lng);
        } else {
          return;
        }
      }
    }
  }

  function closeSearchBar() {
    dispatch(handleShowSearchPopUp(false));
  }

  function saveAddress(address) {
    let street = "";
    let postcode = "";
    let city = "";
    let country = "";

    if (address.features[0]) {
      street = address.features[0].text + " " + address.features[0].address;
    }
    if (address.features[1]) {
      postcode = address.features[1].text;
    }
    if (address.features[2]) {
      city = address.features[2].text;
    }
    if (address.features[4]) {
      country = address.features[4].text;
    }

    const addressObj = {
      street,
      postcode,
      city,
      country,
    };

    dispatch(updateAddress(addressObj));
  }

  function zoomToMarker(e) {
    map.current.easeTo({
      center: [e.lngLat.lng, e.lngLat.lat + 0.00039],
      zoom: 18,
    });
    dispatch(hideAll());
    dispatch(handleShowSearchPopUp(false));
  }

  useEffect(() => {
    if (markerLat && markerLng && map.current && !placedPin) {
      marker.current = new mapboxgl.Marker()
        .setLngLat([markerLng, markerLat])
        .addTo(map.current);
      dispatch(hideAll());
      dispatch(showNewPin(true));
      if (!registerPlot) {
        let bidHelpDisabled;
        async function hasDisabledBidHelp() {
          bidHelpDisabled = await isBidHelpDisabled();
          if (bidHelpDisabled) {
            dispatch(handleShowPlaceBid(true));
          } else {
            router.push("/PlotOverview/PlotOverview");
            dispatch(handleShowBidHelp(false));
          }
        }
        hasDisabledBidHelp();
      } else if (registerPlot) {
        dispatch(handleShowRegisterModal(true));
      }
    }
  }, [markerLat, markerLng]);

  useEffect(() => {
    if (!placedPin && marker.current) {
      marker.current.remove();
    }
  }, [placedPin]);

  function changeMapLayer(newLayer) {
    removePreviousDots(null, null, null);
    newLayer.selected = true;
    setMapLayers((prevValue) => {
      return prevValue.map((oldLayer) => {
        if (oldLayer.name === newLayer.name) {
          return newLayer;
        } else {
          oldLayer.selected = false;
          return oldLayer;
        }
      });
    });
    map.current.setStyle(newLayer.source);
    dispatch(handleShowLayerChanger(false));
  }

  async function isBidHelpDisabled() {
    try {
      const fromLS = localStorage.getItem("BidHelp");
      if (fromLS) {
        return fromLS;
      } else {
        return false;
      }
    } catch (err) {}
  }

  const showSearchPopUp = useSelector((state) => {
    return state.componentHandler.showSearchPopUp;
  });

  return (
    <>
      <div
        ref={mapContainer}
        className={classes.container}></div>
      <div
        ref={geocoderRef}
        className={

          `${classes.geocoder} `

        }></div>
      {(map.current && <MapButtons
        lat={lat}
        lng={lng}
        map={map.current}
      />)}
      {showLayerChanger && (
        <>
          <ChangeLayer
            changeMapLayer={changeMapLayer}
            layers={mapLayers}
          />

          <div
            onClick={() => {
              dispatch(handleShowLayerChanger(false));
            }}
            className={classes.overlay}></div>
        </>
      )}
    </>
  );
}

export default Mapbox;
