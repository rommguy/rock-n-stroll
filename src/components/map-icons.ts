import L from "leaflet";
import strollerIconSvg from "../icons/stroller-icon.svg";

export const strollerIcon = L.icon({
  className: "strollerIcon",
  iconUrl: strollerIconSvg,
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  // shadowUrl: 'my-icon-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [22, 94]
});
