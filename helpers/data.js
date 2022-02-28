import axios from "axios";

const API_URL = 'https://svc.metrotransit.org/nextripv2';

const fetchRoutes = async () => {
  const response = await axios.get(`${API_URL}/routes`);  
  return response.data.map(item => ({
    value: item.route_id,
    label: item.route_label,
  }));
};

const fetchDirections = async (route) => {
    if(route && route.length) {
      const response =  await axios.get(`${API_URL}/directions/${route}`);
      return response.data.map(item => ({
        value: item.direction_id,
        label: item.direction_name,
      }))
    }
    return Promise.reject("Please pass a valid route");
};

const fetchStops = async (route, direction) => {
  if((!route || !route.length) || typeof direction === "undefined") {
    return Promise.reject("Please pass a valid route and direction");
  }
  const response =  await axios.get(`${API_URL}/stops/${route}/${direction}`);
  return response.data.map(item => ({
    value: item.place_code,
    label: item.description,
  }));
};

const fetchStopDetails = async(route, direction, stop) => {
  if((!route || !route.length) || typeof direction === "undefined" || (!stop || !stop.length)) {
    return Promise.reject("Please pass a valid route, direction and stop");
  }  
  const response =  await axios.get(`${API_URL}/${route}/${direction}/${stop}`);
  const stopDetail = response.data.stops[0];
  return {
    id: stopDetail.stop_id,
    description: stopDetail.description,
    departures: response.data.departures
  }
};
export {
  fetchRoutes,
  fetchDirections,
  fetchStops,
  fetchStopDetails,
}