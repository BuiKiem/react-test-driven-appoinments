import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import { AppointmentsDayView } from "./components/AppointmentsDayView";

import { sampleAppointments, sampleAvailableTimeSlots } from "./sampleData";
import { AppointmentForm } from "./components/AppointmentForm";

ReactDOM.render(
  <div>
    <AppointmentsDayView appointments={sampleAppointments} />
    <AppointmentForm availableTimeSlots={sampleAvailableTimeSlots} />
  </div>,
  document.getElementById("root"),
);
