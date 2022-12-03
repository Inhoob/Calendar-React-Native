import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
function Calendar() {
  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth() + 1;

  const [month, setMonth] = useState(MONTH);
  const [year, setYear] = useState(YEAR);

  const moveToNextMonth = (month) => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
      return { year: year + 1, month: 1 };
    } else {
      setMonth(month + 1);
      return { year: year, month: month + 1 };
    }
  };

  const moveToPreviousMonth = (month) => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <View style={S.calendarContainer}>
      <Header
        month={month}
        year={year}
        moveToNextMonth={moveToNextMonth}
        moveToPreviousMonth={moveToPreviousMonth}
      />
      <Body
        month={month}
        year={year}
        moveToNextMonth={moveToNextMonth}
        moveToPreviousMonth={moveToPreviousMonth}
      />
    </View>
  );
}
export default Calendar;

function Header(props) {
  return (
    <View style={S.header}>
      <Pressable onPress={props.moveToPreviousMonth.bind(this, props.month)}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </Pressable>
      <Text>
        {props.month}월 {props.year}
      </Text>
      <Pressable onPress={props.moveToNextMonth.bind(this, props.month)}>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </Pressable>
    </View>
  );
}
//Year,Monty,date
function Body(props) {
  const [totalDays, setTotalDays] = useState({});
  const [pressed, setPressed] = useState({
    state: "",
    year: 0,
    month: 0,
    date: 0,
  });
  const { year, month } = props;
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
    );
    setTotalDays({
      prev: {
        daysList: previousMonthLastDay !== 6 ? previousDays : [],
        year: month === 1 ? year - 1 : year,
        month: month === 1 ? 12 : month - 1,
      },
      curr: { daysList: currentDays, year: year, month: month },
      next: {
        daysList: nextDays,
        year: month === 12 ? year + 1 : year,
        month: month === 12 ? 1 : month + 1,
      },
    });
  };

  const handlePressDay = (pressedDate) => {
    setPressed(pressedDate);
  };

  return (
    <View>
      <View style={S.dayOfWeek}>
        {dayOfWeek.map((day, idx) => (
          <View style={S.box}>
            <Text style={dS(day).dayOfWeek} key={idx}>
              {day}
            </Text>
          </View>
        ))}
      </View>
      <View style={S.totalDays}>
        {Object.keys(totalDays).map((el) =>
          totalDays[el].daysList.map((day, idx) => {
            const pressedDate = {
              state: el,
              year: totalDays[el].year,
              month: totalDays[el].month,
              date: day,
            };
            return (
              <View style={S.box}>
                <Pressable
                  onPress={handlePressDay.bind(this, pressedDate)}
                  style={
                    pressed.date === pressedDate.date &&
                    pressed.month === pressedDate.month &&
                    pressed.year === pressedDate.year
                      ? S.pressedDate
                      : null
                  }
                >
                  <Text
                    style={el === "prev" || el === "next" ? S.prev : S.curr}
                    key={`${el}-${idx}`}
                  >
                    {day}
                  </Text>
                </Pressable>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
}

const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const S = StyleSheet.create({
  calendarContainer: {
    width: "100%",
    minHeight: "50%",
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
  dayOfWeek: {
    flexDirection: "row",
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
  pressedDate: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
const dS = (el) =>
  StyleSheet.create({
    dayOfWeek: {
      color: el === "Sun" ? "red" : el === "Sat" ? "blue" : "gray",
      fontSize: 16,
    },
  });
