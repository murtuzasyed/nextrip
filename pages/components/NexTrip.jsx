import { useState, useEffect} from "react"
import Router, { useRouter } from 'next/router'
import CustomSelect from "./CustomSelect";
import StopDetail from "./StopDetail";
import styles from './NexTrip.module.css';
import { fetchDirections, fetchStops, fetchStopDetails } from "../../helpers/data";
import classNamesBind from 'classnames/bind';

const cx = classNamesBind.bind(styles);
const NexTrip = (props) => {
  const { isReady, query } = useRouter();
  const defaultDirection = {
    value: "",
    label: "Select Direction"
  };
  const defaultStop = {
    value: "",
    label: "Select Stop"
  };
  
  const [currentRoute, setCurrentRoute] = useState(0);
  const [currentDirection, setCurrentDirection] = useState(0);
  const [directions, setDirections] = useState([]);
  const [stops, setStops] = useState([]);
  const [stopDetails, setStopDetails] = useState({});
  
  
  const onRouteSelected = async(route) => {
    // Rest the stops and directions state when a different route is selected
    setStops([]);
    setDirections([]);
    setStopDetails({});
    setCurrentRoute(route);
    
    if(route.length) {
      const directions = await fetchDirections(route);
      setDirections([defaultDirection, ...directions]);
    }
  };

  const onDirectionSelected = async (direction) => {
    setCurrentDirection(direction);
    setStops([]);
    setStopDetails({});
    const stops = await fetchStops(currentRoute, direction);
    setStops([defaultStop, ...stops]);
  };

  const onStopSelected = async (currentStop) => {
    // const href =`/${currentRoute}/${currentDirection}/${currentStop}`;
    // router.push(href, undefined, { shallow: true });
    const href = `/?route=${currentRoute}&direction=${currentDirection}&stop=${currentStop}`;

    Router.push(href, href, { shallow: true })
    const { id, description, departures } = await fetchStopDetails(currentRoute, currentDirection, currentStop);
    setStopDetails({
      id,
      description,
      departures
    });
  };


  useEffect(async () => {
    if (!isReady) return;
    const {route, direction, stop} = query;
    if((!route || !route.length) || (typeof direction === "undefined") || (!stop|| !stop.length)) return;
    // const [currentRoute, currentDirection, currentStop] = query.slug;
    const stopDetails = await fetchStopDetails(route, direction, stop)
    setStopDetails(stopDetails);
  }, [isReady, query])
  
  
  return (
    <div className={cx('nextrip-container')}>
      <div className={cx('nextrip-selectgroup')}>
        <CustomSelect onChange = {(e) => onRouteSelected(e.target.value)} selectOptions = { props.routes } id ="routes" name="routes" />
        {
            directions.length > 0 && 
              <CustomSelect onChange = {(e) => onDirectionSelected(e.target.value)} selectOptions = { directions } id ="directions" name="directions" />
        }
        {
            stops.length > 0 && 
              <CustomSelect onChange = {(e) => onStopSelected(e.target.value)} selectOptions = { stops } id ="stops" name="stop" />
        }
      </div>
      {
        (stopDetails.description || stopDetails.departures) && 
          <div className={cx('nextrip-detail-section')}>
            <StopDetail description={stopDetails.description} departures = {stopDetails.departures} id={stopDetails.id} />
          </div>
      }      
    </div>
  );
}

export default NexTrip;