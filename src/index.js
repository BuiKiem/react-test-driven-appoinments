import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import { AppointmentsDayView } from "./components/AppointmentsDayView";

import { sampleAppointments } from "./sampleData";
import { AppointmentForm } from "./components/AppointmentForm";

ReactDOM.render(
  <div>
    <AppointmentsDayView appointments={sampleAppointments} />
    <AppointmentForm availableTimeSlots={sampleAppointments} />
  </div>,
  document.getElementById("root"),
);
