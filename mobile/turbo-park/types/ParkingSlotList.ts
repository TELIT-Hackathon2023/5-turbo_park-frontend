export interface ParkingSlotList {
  id: number;
  status: "USED" | "UNAVAILABLE" | "FREE";
  coordinate1: [number];
  coordinate2: [number];
  coordinate3: [number];
  coordinate4: [number];
}
