import React, { useMemo, useState } from "react";

const Calender = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const date = currentDate.getDate();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weeks = useMemo(() => {
    const firstWeekDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    let cells = [];

    for (let i = 0; i < firstWeekDay; i++) {
      cells.push("");
    }
    for (let i = 1; i <= totalDays; i++) {
      cells.push(i);
    }

    while (cells.length < 42) {
      cells.push("");
    }

    const rows = [];

    for (let i = 0; i < cells.length; i += 7) {
      rows.push(cells.slice(i, i + 7));
    }
    return rows;
  }, [currentDate]);

  const [isYearInputVisible, setIsYearInputVisible] = React.useState(false);

  const prevYear = () => setCurrentDate(new Date(year - 1, month, date));
  const nextYear = () => setCurrentDate(new Date(year + 1, month, date));
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, date));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, date));

  return (
    <div style={{ width: "fit-content", margin: "auto"}}>
      <h1>Calender</h1>
      <select
        onChange={(e) => {
          setCurrentDate(
            new Date(year, parseInt(e.target.value), currentDate.getDate())
          );
        }}
        value={month}
      >
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
      {!isYearInputVisible && (
        <span className="year" onDoubleClick={() => setIsYearInputVisible(true)}>{year}</span>
      )}
      {isYearInputVisible && (
        <input
          type="number"
          onChange={(e) => {
            setCurrentDate(
              new Date(e.target.value, month, currentDate.getDate())
            );
          }}
          value={year}
          onBlur={() => setIsYearInputVisible(false)}
        />
      )}
      <hr/>
      <table>
        <thead>
          <tr>
            {days.map((day, index) => (
              <th style={{
                backgroundColor: index === currentDate.getDay()? "#000" : "#f4b644ff",
                padding: 10,
                color: "#fff"                
              }} key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => {
            return (
              <tr>
                {week.map((day) => (
                  <td style={{
                    padding: 10,
                    height: 30,
                    backgroundColor: day === currentDate.getDate() ? "#f82a2aff" : "#ffeeaa",
                    fontSize: "1em",
                    fontWeight: day === currentDate.getDate() ? "bold": "normal" ,
                    color: day === currentDate.getDate() ? "white": "black" ,
                    textAlign: "center",

                  }}>{day}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr/>
      <button onClick={prevYear}>{"<<"}</button>
      <button onClick={prevMonth}>{"<"}</button>
      <button onClick={nextMonth}>{">"}</button>
      <button onClick={nextYear}>{">>"}</button>
    </div>
  );
};

export default Calender;
