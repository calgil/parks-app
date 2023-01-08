import s from "./StatesMap.module.css";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";
import allStates from "../../../data/allStates.json";
import { stateStyles } from "./stateStyles";
import { useNavigate } from "react-router-dom";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

export const StatesMap = () => {
  const navigate = useNavigate();

  const getParks = async (stateCode) => {
    navigate(`state/${stateCode}`);
  };

  const handleStateClick = async (id) => {
    const cur = allStates.find((s) => s.val === id);
    if (!cur) {
      return;
    }
    getParks(cur.id.toLowerCase());
    console.log("state", cur.id.toLowerCase());
  };

  const handleMarkerClick = (id) => {
    getParks(id.toLowerCase());
    console.log("marker", id.toLowerCase());
  };
  return (
    <div className={s.stateContainer}>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  className={s.state}
                  style={stateStyles}
                  onClick={() => handleStateClick(geo.id)}
                />
              ))}
              {geographies.map((geo) => {
                const centroid = geoCentroid(geo);
                const cur = allStates.find((s) => s.val === geo.id);
                return (
                  <g className={s.state} key={geo.rsmKey + "-name"}>
                    {cur &&
                      centroid[0] > -160 &&
                      centroid[0] < -67 &&
                      (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                        <Marker
                          coordinates={centroid}
                          onClick={() => handleMarkerClick(cur.id)}
                        >
                          {cur.id === "HI" ? (
                            <text
                              y="2"
                              fontSize={14}
                              textAnchor="middle"
                              fill="white"
                            >
                              {cur.id}
                            </text>
                          ) : (
                            <text y="2" fontSize={14} textAnchor="middle">
                              {cur.id}
                            </text>
                          )}
                        </Marker>
                      ) : (
                        <Annotation
                          subject={centroid}
                          dx={offsets[cur.id][0]}
                          dy={offsets[cur.id][1]}
                          connectorProps={{
                            stroke: "white",
                          }}
                        >
                          <text
                            x={4}
                            fontSize={14}
                            alignmentBaseline="middle"
                            fill="white"
                          >
                            {cur.id}
                          </text>
                        </Annotation>
                      ))}
                  </g>
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>
    </div>
  );
};
