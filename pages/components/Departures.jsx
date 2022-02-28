import * as React from "react";
import classNamesBind from "classnames/bind";
import styles from "./Departures.module.css";
const cx = classNamesBind.bind(styles);

const createRows = (departures) => departures.map((departure) => (      
    <tr key={departure.trip_id}>
      <td>{departure.route_short_name}</td>
      <td>{departure.description}</td>
      <td>{departure.departure_text}</td>
    </tr>
  ));

const Departures = ({departures}) => (<table className={cx('departures-table')}>    
    <tbody>
      <tr>
        <th>ROUTE</th>
        <th>DESTINATION</th>
        <th>DEPARTS</th>
      </tr>
      {
        !departures.length ? <tr>No departures at this time!</tr> : createRows(departures)
      }
    </tbody>
  </table>
)
export default Departures;