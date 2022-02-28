import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router'
import StopDetail from '../components/StopDetail';
import { fetchStopDetails } from '../../helpers/data';
import classNamesBind from 'classnames/bind';
import styles from '../components/NexTrip.module.css';

const cx = classNamesBind.bind(styles);

export default function Comment() {
  const { query, isReady } = useRouter();
  const [stopDetails, setStopDetails] = useState({});
  useEffect(async () => {
    if (!isReady) return;
    const [currentRoute, currentDirection, currentStop] = query.slug;
    const stopDetails = await fetchStopDetails(currentRoute, currentDirection, currentStop)
    setStopDetails(stopDetails);
  }, [isReady])
  

  return (
    <>
     {
        (stopDetails.description || stopDetails.departures) && 
          <div className={cx('nextrip-detail-section')}>
            <StopDetail description={stopDetails.description} departures = {stopDetails.departures} id={stopDetails.id} />
          </div>
      }
    </>
  )
}