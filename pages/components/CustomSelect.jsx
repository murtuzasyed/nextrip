import React from "react";
import classNamesBind from 'classnames/bind';
import styles from "./CustomSelect.module.css"
const cx = classNamesBind.bind(styles);

// Use PropTypes to validate props
// {
//     selectOptions,
//     onChange,
//     id,
//     name
// }
const CustomSelect = (props) => (
  <select className={cx('custom-select')} defaultValue="" name={props.name} id={props.id} onChange={props.onChange}>
    {
      props.selectOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)
    }
  </select>
)
export default CustomSelect;