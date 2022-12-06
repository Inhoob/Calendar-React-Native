import { Animated, StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { v4 as uuidv4 } from "uuid";
import isSameObj from "../../utils/isSameObj";
import divideArray from "../../utils/divideArray";
import GestureRecognizer from "react-native-swipe-gestures";
import { Swipeable } from "react-native-gesture-handler";
function Body(props) {
  const [totalDays, setTotalDays] = useState([]);
  const [totalDaysByState, setTotalDaysByState] = useState({});
  const [pressedDate, setPressedDate] = useState({
    state: "",
    year: 0,
    month: 0,
    date: 0,
  });
  const [week, setWeek] = useState(0);
  const [viewTotalDays, setViewTotalDays] = useState(true);
  const { year, month, date } = props;

  useEffect(() => {
    getTotalDays(year, month);
  }, [year, month, date]);

  useEffect(() => {
    totalDays.forEach((el, idx) => {
      if (el.includes(date)) {
        setWeek(idx);
      }
    });
  }, [totalDays]);

  const getTotalDays = (year, month) => {
    const previousMonthLastDate = new Date(year, month - 1, 0).getDate();
    const previousMonthLastDay = new Date(year, month - 1, 0).getDay();
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

    setTotalDays(
      divideArray([...previousDays, ...currentDays, ...nextDays], 7)
    );

    setTotalDaysByState({
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

  const onSwipeLeft = (gestureState) => {
    if (viewTotalDays === true) {
      props.moveToNextMonth(month);
    }
    if (viewTotalDays === false) {
      if (totalDays[week + 1] === undefined) {
        props.moveToNextMonth(month);
        setWeek(0);
      } else {
        setWeek(week + 1);
      }
    }
  };
  const onSwipeRight = (gestureState) => {
    if (viewTotalDays === true) {
      props.moveToPreviousMonth(month);
    }
    if (viewTotalDays === false) {
      if (totalDays[week - 1] === undefined) {
        props.moveToPreviousMonth(month);
        if (
          new Date(year, month - 1, 0).getDay() === 4 ||
          new Date(year, month - 1, 0).getDay() === 5
        ) {
          setWeek(5);
        } else {
          setWeek(4);
        }
      } else {
        setWeek(week - 1);
      }
    }
  };
  const onSwipeUp = () => {
    setViewTotalDays(false);
  };
  const onSwipeDown = () => {
    setViewTotalDays(true);
  };

  return (
    <GestureRecognizer
      onSwipeUp={onSwipeUp}
      onSwipeDown={onSwipeDown}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={{ velocityThreshold: 0.1 }}
    >
      <View style={S.dayOfWeek}>
        {dayOfWeek.map((day, idx) => (
          <View style={S.box} key={idx}>
            <Text style={changeColorByDay(day).dayOfWeek}>{day}</Text>
          </View>
        ))}
      </View>
      <View>
        {viewTotalDays ? (
          <View style={S.totalDays}>
            {Object.keys(totalDaysByState).map((state) =>
              totalDaysByState[state].daysList.map((day) => {
                const checkPressedDate = {
                  state: state,
                  year: totalDaysByState[state].year,
                  month: totalDaysByState[state].month,
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
        ) : (
          <View style={{ width: "100%", flexDirection: "row" }}>
            {totalDays[week]?.map((el, idx) => {
              const checkPressedDate = {
                year: year,
                month: month,
                date: el,
              };
              return (
                <View style={S.box} key={idx}>
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
                          isSameObj({ ...props.today }, checkPressedDate)
                            ? S.today
                            : S.curr,
                        ],
                      ]}
                    >
                      {el}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </GestureRecognizer>
  );
}

export default Body;
const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const S = StyleSheet.create({
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
