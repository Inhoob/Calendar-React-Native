import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Body from "./Body";
import Header from "./Header";

function Calendar() {
  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth() + 1;
  const DAY = DATE.getDate();
  const today = { year: YEAR, month: MONTH, date: DAY };

  const [month, setMonth] = useState(MONTH);
  const [year, setYear] = useState(YEAR);
  const [date, setDate] = useState(DAY);
  const moveToNextMonth = (month) => {
    if (month === 12) {
      setYear((previousYear) => previousYear + 1);
      setMonth(1);
    } else {
      setMonth((previousMonth) => previousMonth + 1);
    }
  };

  const moveToPreviousMonth = (month) => {
    if (month === 1) {
      setYear((previousYear) => previousYear - 1);
      setMonth(12);
    } else {
      setMonth((previousMonth) => previousMonth - 1);
    }
  };

  const moveToSpecificYearAndMonth = (year, month) => {
    setYear(year);
    setMonth(month);
  };

  return (
    <View style={S.calendarContainer}>
      <Header
        month={month}
        year={year}
        moveToNextMonth={moveToNextMonth}
        moveToPreviousMonth={moveToPreviousMonth}
        moveToSpecificYearAndMonth={moveToSpecificYearAndMonth}
      />
      <Body
        month={month}
        year={year}
        today={today}
        date={date}
        moveToNextMonth={moveToNextMonth}
        moveToPreviousMonth={moveToPreviousMonth}
        moveToSpecificYearAndMonth={moveToSpecificYearAndMonth}
      />
    </View>
  );
}
export default Calendar;

const S = StyleSheet.create({
  calendarContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
});
