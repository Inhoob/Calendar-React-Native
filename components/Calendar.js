import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { v4 as uuidv4 } from "uuid";
import isSameObj from "../utils/isSameObj";
import SelectYearModal from "./Modal/SelectYearModal";
import SelectMonthModal from "./Modal/SelectMonthModal";
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

function Header(props) {
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  return (
    <>
      <View style={S.header}>
        <Pressable
          onPress={props.moveToPreviousMonth.bind(this, props.month)}
          style={({ pressed }) => pressed && S.pressed}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={setMonthModalVisible.bind(this, true)}>
            <Text>{props.month}월 </Text>
          </Pressable>
          <Pressable onPress={setYearModalVisible.bind(this, true)}>
            <Text>{props.year}</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={props.moveToNextMonth.bind(this, props.month)}
          style={({ pressed }) => pressed && S.pressed}
        >
          <Ionicons name="chevron-forward" size={24} color="black" />
        </Pressable>
      </View>
      <SelectMonthModal
        year={props.year}
        modalVisible={monthModalVisible}
        setModalVisible={setMonthModalVisible}
        moveToSpecificYearAndMonth={props.moveToSpecificYearAndMonth}
      />
      <SelectYearModal
        month={props.month}
        year={props.year}
        modalVisible={yearModalVisible}
        setModalVisible={setYearModalVisible}
        moveToSpecificYearAndMonth={props.moveToSpecificYearAndMonth}
      />
    </>
  );
}
//Year,Monty,date
function Body(props) {
  const [totalDays, setTotalDays] = useState({});
  const [pressedDate, setPressedDate] = useState({
    state: "",
    year: 0,
    month: 0,
    date: 0,
  });
  const { year, month, date } = props;
  useEffect(() => {
    getTotalDays(year, month);
  }, [year, month, date]);

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
    setPressedDate(pressedDate);
    if (pressedDate.state === "prev" || pressedDate.state === "next") {
      props.moveToSpecificYearAndMonth(pressedDate.year, pressedDate.month);
    }
  };
  //{({ pressed }) => pressed && styles.pressedItem}
  return (
    <View>
      <View style={S.dayOfWeek}>
        {dayOfWeek.map((day, idx) => (
          <View style={S.box} key={idx}>
            <Text style={changeColorByDay(day).dayOfWeek}>{day}</Text>
          </View>
        ))}
      </View>
      <View style={S.totalDays}>
        {Object.keys(totalDays).map((state) =>
          totalDays[state].daysList.map((day) => {
            const checkPressedDate = {
              state: state,
              year: totalDays[state].year,
              month: totalDays[state].month,
              date: day,
            };
            return (
              <View style={S.box} key={uuidv4()}>
                <Pressable
                  onPress={handlePressDay.bind(this, checkPressedDate)}
                  style={({ pressed }) => {
                    return [
                      pressedDate.date === checkPressedDate.date &&
                      pressedDate.month === checkPressedDate.month &&
                      pressedDate.year === checkPressedDate.year
                        ? S.pressedDate
                        : null,
                      pressed && S.pressed,
                    ];
                  }}
                >
                  <Text
                    style={[
                      [
                        isSameObj(
                          { state: "curr", ...props.today },
                          checkPressedDate
                        )
                          ? S.today
                          : state === "prev" || state === "next"
                          ? S.prev
                          : S.curr,
                      ],
                    ]}
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
    marginTop: 60,
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
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  prev: {
    color: "gray",
    fontSize: 24,
  },
  next: {
    color: "gray",
    fontSize: 24,
  },
  curr: {
    color: "black",
    fontSize: 24,
  },
  today: {
    color: "#2196f3",
    fontSize: 24,
  },
  pressedDate: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.3,
  },
});
const changeColorByDay = (day) =>
  StyleSheet.create({
    dayOfWeek: {
      color: day === "Sun" ? "red" : day === "Sat" ? "blue" : "gray",
      fontSize: 16,
    },
  });
