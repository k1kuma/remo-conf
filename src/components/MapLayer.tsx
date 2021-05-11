import React, { useEffect, useRef } from "react";
import ConferenceMapSVG from "../assets/conference-map.svg";

interface IMapLayerProps {
  setMapInfo: React.Dispatch<React.SetStateAction<IMapInfo | undefined>>;
}
const MapLayer = ({ setMapInfo }: IMapLayerProps) => {
  const elementRef = useRef<any>();

  // We want the map info to change when the component _first_ mounts,
  // and whenever the window is resized. Otherwise it will only update
  // the map when the window is resized.
  useEffect(() => {
    setMapInfo({
      left: elementRef.current.clientLeft,
      top: elementRef.current.clientTop,
      width: elementRef.current.clientWidth,
      height: elementRef.current.clientHeight,
    });
  }, [setMapInfo]);

  useEffect(() => {
    window.onresize = (e: any) => {
      if (elementRef.current) {
        setMapInfo({
          left: elementRef.current.clientLeft,
          top: elementRef.current.clientTop,
          width: elementRef.current.clientWidth,
          height: elementRef.current.clientHeight,
        });
      }
    };
  }, [setMapInfo]);

  return (
    <img
      alt="Remo Map"
      ref={elementRef}
      src={ConferenceMapSVG}
      style={{ pointerEvents: "none" }}
    />
  );
};

export default MapLayer;
