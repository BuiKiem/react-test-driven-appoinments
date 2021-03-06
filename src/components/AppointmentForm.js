import React, { useState, useCallback } from "react";

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

const weeklyDateValues = startDate => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0);
  const increment = 24 * 60 * 60 * 1000;
  return timeIncrements(7, midnight, increment);
};

const mergeDateAndTime = (date, timeSlot) => {
  const time = new Date(timeSlot);
  return new Date(date).setHours(
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
    time.getMilliseconds(),
  );
};

const toTimeValue = timestamp =>
  new Date(timestamp).toTimeString().substring(0, 5);

const toShortDate = timestamp => {
  const [day, , dayOfMonth] = new Date(timestamp).toDateString().split(" ");
  return `${day} ${dayOfMonth}`;
};

const RadioButtonIfAvailable = ({
  availableTimeSlots,
  date,
  timeSlot,
  checkedTimeSlot,
  handleChange,
}) => {
  const startsAt = mergeDateAndTime(date, timeSlot);
  if (
    availableTimeSlots.some(
      availableTimeSlot => availableTimeSlot.startsAt === startsAt,
    )
  ) {
    const isChecked = startsAt === checkedTimeSlot;
    return (
      <input
        type="radio"
        name="startsAt"
        value={startsAt}
        checked={isChecked}
        onChange={handleChange}
      />
    );
  }

  return null;
};

const TimeSlotTable = ({
  salonOpensAt,
  salonClosesAt,
  today,
  availableTimeSlots,
  checkedTimeSlot,
  handleChange,
}) => {
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt);
  const dates = weeklyDateValues(today);
  return (
    <table id="time-slots">
      <thead>
        <tr>
          <th />
          {dates.map(date => (
            <th key={`${date}`}>{toShortDate(date)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map(timeSlot => (
          <tr key={timeSlot}>
            <th>{toTimeValue(timeSlot)}</th>
            {dates.map(date => (
              <td key={date}>
                <RadioButtonIfAvailable
                  availableTimeSlots={availableTimeSlots}
                  date={date}
                  timeSlot={timeSlot}
                  checkedTimeSlot={checkedTimeSlot}
                  handleChange={handleChange}
                />
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
  selectableStylists,
  service,
  stylist,
  startsAt,
  onSubmit,
  salonOpensAt,
  salonClosesAt,
  today,
  availableTimeSlots,
  serviceStylists,
}) => {
  const [appointment, setAppointment] = useState({
    service,
    startsAt,
    stylist,
  });

  const handleChangeSelectBox = ({ target: { value, name } }) => {
    setAppointment(appointment => ({
      ...appointment,
      [name]: value,
    }));
  };

  const handleChangeStartsAt = useCallback(
    ({ target: { value } }) =>
      setAppointment(appointment => ({
        ...appointment,
        startsAt: parseInt(value),
      })),
    [],
  );

  const stylistsForService = appointment.service
    ? serviceStylists[appointment.service]
    : selectableStylists;

  const timeSlotsForStylist = appointment.stylist
    ? availableTimeSlots.filter(timeSlot =>
        timeSlot.stylists.includes(appointment.stylist),
      )
    : availableTimeSlots;

  return (
    <form id="appointment" onSubmit={() => onSubmit(appointment)}>
      <label htmlFor="service">Service</label>
      <select
        name="service"
        id="service"
        value={service}
        onChange={handleChangeSelectBox}
      >
        <option />
        {selectableServices.map(service => (
          <option key={service}>{service}</option>
        ))}
      </select>
      <label htmlFor="stylist">Stylist</label>
      <select
        name="stylist"
        id="stylist"
        value={stylist}
        onChange={handleChangeSelectBox}
      >
        <option />
        {stylistsForService.map(stylist => (
          <option key={stylist}>{stylist}</option>
        ))}
      </select>
      <TimeSlotTable
        salonOpensAt={salonOpensAt}
        salonClosesAt={salonClosesAt}
        today={today}
        availableTimeSlots={timeSlotsForStylist}
        checkedTimeSlot={appointment.startsAt}
        handleChange={handleChangeStartsAt}
      />
      <input type="submit" value="Submit" onClick={onSubmit} />
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
  selectableStylists: ["Ashley", "Jo", "Pat", "Sam"],
  serviceStylists: {
    Cut: ["Ashley", "Jo", "Pat", "Sam"],
    "Blow-dry": ["Ashley", "Jo", "Pat", "Sam"],
    "Cut & color": ["Ashley", "Jo"],
    "Beard trim": ["Pat", "Sam"],
    "Cut & beard trim": ["Pat", "Sam"],
    Extensions: ["Ashley", "Pat"],
  },
  salonOpensAt: 9,
  salonClosesAt: 19,
  today: new Date(),
  availableTimeSlots: [],
};
