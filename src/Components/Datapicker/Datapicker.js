import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useSelector, useDispatch } from "react-redux";
import { setActiveDate } from "../check_slice";

const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};

export default function Datapicker() {
  const dispatch = useDispatch();
  const { activeDate } = useSelector((state) => state.groups);
  console.log(activeDate);

  const validDate = (item) => {
    if (item.length === 1) {
      return "0" + item;
    } else {
      return item;
    }
  };

  const sentDate = (value) => {
    return `${validDate(value.$y.toString())}-${validDate(
      (value.$M + 1).toString()
    )}-${validDate(value.$D.toString())}`;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        value={activeDate}
        shouldDisableDate={isWeekend}
        onChange={(newValue) => {
          dispatch(setActiveDate(sentDate(newValue)));
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
