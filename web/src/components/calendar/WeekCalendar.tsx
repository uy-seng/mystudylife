import React from "react";
import moment from "moment";

interface Props {
  currentDate: Date;
}

export const WeekCalendar: React.FC<Props> = ({ currentDate }) => {
  React.useEffect(() => {
    console.log(moment(currentDate).startOf("week").toString());
  }, []);

  return (
    <div>
      <h1>Meow</h1>
    </div>
  );
};
