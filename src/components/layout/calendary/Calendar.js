import React, { useEffect, useState, useContext } from "react";
import HourForm from "./HourForm";
import { Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import BookContext from "../../../context/BookContext";
import UserContext from "../../../context/UserContext";

const dataNamesDays = [
  { shortCut: "Sun", name: "Sunday" },
  { shortCut: "Mon", name: "Monday" },
  { shortCut: "Tue", name: "Tuesday" },
  { shortCut: "Wed", name: "Wednesday" },
  { shortCut: "Thu", name: "Thursday" },
  { shortCut: "Fri", name: "Friday" },
  { shortCut: "Sat", name: "Saturday" },
];

const Calendar = () => {
  const [availableDates, setAvailableDates] = useState([]);
  const { bookData, setBookData } = useContext(BookContext);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const arr = [];
    for (let i = 1; i < 18; i++) {
      if (i !== 11) {
        const fortnightAway = new Date(
          Date.now() + 1000 * 60 * 60 * 24 * (1 * i)
        ).toString();

        arr.push({
          year: fortnightAway.slice(11, 15),
          month: fortnightAway.slice(4, 7),
          day: fortnightAway.slice(8, 10),
          name: fortnightAway.slice(0, 3),
        });
      }
      setAvailableDates(arr);
    }
  }, []);

  const NameDay = ({ name }) =>
    dataNamesDays.map((el) => {
      if (el.shortCut === name) {
        return <h2 key={Math.floor(Math.random())}>{el.name}</h2>;
      }
      return null;
    });

  const handleClick = (date) => {
    setBookData({
      ...bookData,
      userId: userData.user.id,
      dateDay: date.day,
      dateMonth: date.month,
      dateYear: date.year,
      email: userData.user.email,
    });
  };

  const Tiles = () =>
    availableDates.map((date) => (
      <NavLink
        to="/booking/form"
        key={`${date.day}-${date.month}-${date.year}`}
        onClick={() => handleClick(date)}
      >
        <div className="tile">
          <h1>{date.day}</h1>
          <NameDay name={date.name} />
          <h2>{date.month}</h2>
          <h3>{date.year}</h3>
        </div>
      </NavLink>
    ));

  return (
    <>
      <div className="board">
        <Tiles />
      </div>
      <Switch>
        <Route path="/booking/form">
          <HourForm />
        </Route>
      </Switch>
    </>
  );
};

export default Calendar;
