mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: [10.5, -17], // starting position [lng, lat]
  zoom: 5, // starting zoom
});
