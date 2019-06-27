import * as H from "history";

export interface Person {
  id: string
  location: [number, number];
}

export type RouterHistory = H.History;
export type RouterLocation = H.Location;

export interface RouteProps {
  match: { params: object };
  history: RouterHistory;
  location: RouterLocation;
}
