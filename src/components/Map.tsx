import React, { FunctionComponent, useEffect } from "react";
import L from "leaflet";
import { strollerIcon } from "./map-icons";
import { Person } from "../types";

const peopleList: Person[] = [
  { location: [32.0853, 34.7818] },
  { location: [32.0853, 34.7828] },
  { location: [32.0833, 34.7808] }
];

export const Map: FunctionComponent<{}> = () => {
  useEffect(() => {
    const map = L.map("map", {
      center: [32.0853, 34.7818],
      zoom: 13
    });
    // tiles
    const accessToken = `pk.eyJ1IjoiaWRvcm9zIiwiYSI6ImNqeGVpMW16ZTBqMWozcG13YmZsc3JleG8ifQ.L0n-wINnynN_5gTr9yUYZg`;
    L.tileLayer(
      `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${accessToken}`,
      {
        attribution:
          // tslint:disable-next-line: max-line-length
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox.streets"
      } as any
    ).addTo(map);

    // markers
    for (const person of peopleList) {
      const marker = L.marker(person.location, {
        icon: strollerIcon
      });
      marker.addTo(map);
    }
  }, []);

  return (
    <div>
      <div id="map" style={{ height: "100vh" }} />
    </div>
  );
};
