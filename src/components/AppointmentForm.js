import React, { useState } from "react";

const timeIncrements = (numTimes, startTime, increment) =>
  Array(numTimes)
    .fill([startTime])
    .reduce((acc, _, index) => acc.concat([startTime + index * increment]));

const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2;
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
  const increment = 30 * 60 * 1000;
  return timeIncrements(totalSlots, startTime, increment);
};

const toTimeValue = timestamp =>
  new Date(timestamp).toTimeString().substring(0, 5);

const weeklyDateValues = startDate => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0);
  const increment = 24 * 60 * 60 * 1000;
  return timeIncrements(7, midnight, increment);
};

const toShortDate = timestamp => {
  const [day, , dayOfMonth] = new Date(timestamp).toDateString().split(" ");
  return `${day} ${dayOfMonth}`;
};

const TimeSlotTable = ({ salonOpensAt, salonClosesAt, today }) => {
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt);
  const dates = weeklyDateValues(today);
  return (
    <table id="time-slots">
      <thead>
        <tr>
          <th />
          {dates.map(date => (
            <th key={`${date}1010`}>{toShortDate(date)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map(timeSlot => (
          <tr key={`${timeSlot}12132`}>
            <th>{toTimeValue(timeSlot)}</th>
            {dates.map(date => (
              <td key={date}>
                <input type="radio" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const AppointmentForm = ({
  selectableServices,
  service,
  onSubmit,
  salonOpensAt,
  salonClosesAt,
  today,
}) => {
  const [appointment, setAppointment] = useState({
    service,
  });

  const handleChangeService = ({ target }) => {
    setAppointment(appointment => ({
      ...appointment,
      service: target.value,
    }));
  };

  return (
    <form id="appointment" onSubmit={() => onSubmit(appointment)}>
      <label htmlFor="service">Service</label>
      <select
        name="service"
        id="service"
        value={service}
        onChange={handleChangeService}
      >
        <option />
        {selectableServices.map(service => (
          <option key={service}>{service}</option>
        ))}
      </select>
      <TimeSlotTable
        salonOpensAt={salonOpensAt}
        salonClosesAt={salonClosesAt}
        today={today}
      />
    </form>
  );
};

AppointmentForm.defaultProps = {
  selectableServices: [
    "Cut",
    "Blow-dry",
    "Cut & color",
    "Beard trim",
    "Cut & beard trim",
    "Extensions",
  ],
  salonOpensAt: 9,
  salonClosesAt: 19,
  today: new Date(),
};
