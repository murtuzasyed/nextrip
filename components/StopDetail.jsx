import React from "react";
import styles from "./StopDetail.module.css";
import Departures from "./Departures";
import classNamesBind from 'classnames/bind';

const cx = classNamesBind.bind(styles);
const StopDetail = ({description, id, departures}) => (<div className={cx('stopdetail-container')}>
  <div className={cx('stopdetail-description')}>
    <h2>{description}</h2>
    <h3>Stop #:{id}</h3>
  </div>
  <div className={cx('stopdetail-departures')}>
    <Departures departures={departures}/>
  </div>
</div>);

export default StopDetail;