import gcoord from "gcoord";

const reLngLat = /[\d.]+/g;
export function toGCJ02(input) {
  if (typeof input === "string") {
    input = input.match(reLngLat);
  }
  // WGS84转高德地图坐标系：
  return gcoord.transform(input, gcoord.WGS84, gcoord.GCJ02);
}
