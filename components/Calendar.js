import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
function Calendar() {
  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth() + 1;

  const [month, setMonth] = useState(MONTH);
  const [year, setYear] = useState(YEAR);

  return (
    <View style={S.calendarContainer}>
      <Header month={month} year={year} />
      <Body month={month} year={year} />
    </View>
  );
}
export default Calendar;

function Header({ month, year }) {
  const handleMonth = () => {};

  return (
    <View style={S.header}>
      <Ionicons name="chevron-back" size={24} color="black" />
      <Text>
        {month}월 {year}
      </Text>
      <Ionicons name="chevron-forward" size={24} color="black" />
    </View>
  );
}
//Year,Monty,date
function Body({ year, month }) {
  const [totalDays, setTotalDays] = useState({});

  useEffect(() => {
    getTotalDays(year, month);
  }, [year, month]);

  const getTotalDays = (year, month) => {
    const previousMonthLastDate = new Date(year, month - 1, 0).getDate(); //이 전달의 마지막 날짜 체크
    const previousMonthLastDay = new Date(year, month - 1, 0).getDay(); //이 전 달의 마지막 날짜의 요일
    const currentMonthLastDate = new Date(year, month, 0).getDate();
    const currentMonthLastDay = new Date(year, month, 0).getDay();

    const previousDays = Array.from(
      { length: previousMonthLastDay + 1 },
      (v, i) => previousMonthLastDate - previousMonthLastDay + i
    );
    const currentDays = Array.from(
      { length: currentMonthLastDate },
      (v, i) => i + 1
    );
    const nextDays = Array.from(
      { length: 6 - currentMonthLastDay },
      (v, i) => i + 1
    ); //0일때 6, 1일때 5
    setTotalDays({
      prev: previousMonthLastDay !== 6 ? previousDays : [],
      curr: currentDays,
      next: nextDays,
    });
  };

  return (
    <View style={S.body}>
      <View style={S.dayOfWeek}>
        {dayOfWeek.map((el, idx) => (
          <View style={S.box}>
            <Text style={dS(el).dayOfWeek} key={idx}>
              {el}
            </Text>
          </View>
        ))}
      </View>
      <View style={S.totalDays}>
        {totalDays?.prev?.map((el, idx) => (
          <View style={S.box}>
            <Text style={S.prev} key={idx}>
              {el}
            </Text>
          </View>
        ))}
        {totalDays?.curr?.map((el, idx) => (
          <View style={S.box}>
            <Text style={S.curr} key={idx}>
              {el}
            </Text>
          </View>
        ))}
        {totalDays?.next?.map((el, idx) => (
          <View style={S.box}>
            <Text style={S.next} key={idx}>
              {el}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const S = StyleSheet.create({
  calendarContainer: {
    width: "100%",
    height: "60%",
    borderBottomColor: "black",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 72,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    // flexDirection: "row",
    // flexWrap: "wrap",
  },
  dayOfWeek: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  totalDays: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  box: {
    width: "14.2%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  prev: {
    color: "gray",
    fontSize: 16,
  },
  next: {
    color: "gray",
    fontSize: 16,
  },
  curr: {
    color: "black",
    fontSize: 16,
  },
});
const dS = (el) =>
  StyleSheet.create({
    dayOfWeek: {
      color: el === "Sun" ? "red" : el === "Sat" ? "blue" : "gray",
      fontSize: 16,
    },
  });
