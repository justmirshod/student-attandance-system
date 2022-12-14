import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useSelector, useDispatch } from "react-redux";
import { setActiveDate } from "../check_slice";
import { useNavigate } from "react-router-dom";
import { createAttandance } from "../check_slice";
import { read_cookie } from "sfcookies";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { fetchAttandanceDate } from "../see_slice";

const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};

export default function Datapicker() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { activeDate, activeSubject, attandance } = useSelector(
    (state) => state.groups
  );
  const navigate = useNavigate();
  const token = read_cookie("access_token");

  const attandanceCreate = () => {
    dispatch(
      createAttandance({ subjectId: activeSubject, date: activeDate, token })
    );
  };

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

  const seeAttandanceDate = () => {
    dispatch(fetchAttandanceDate({ token, date: activeDate }));
  };

  return (
    <div className="relative">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="landscape"
          openTo="day"
          value={activeDate}
          shouldDisableDate={isWeekend}
          onChange={(newValue) => {
            dispatch(setActiveDate(sentDate(newValue)));
          }}
          onAccept={() => {}}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <div className="text-right pr-3 absolute bottom-4 right-0 bg-white w-full py-4">
        <button
          className="font-medium p-1 rounded hover:bg-gray-50 w-20 uppercase text-buttonMain"
          onClick={() => {
            if (location.pathname === "/check-attandance") {
              attandanceCreate();
            } else {
              seeAttandanceDate();
            }
          }}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
