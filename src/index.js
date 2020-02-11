import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { AppointmentsDayView } from "./components/Appoinment";

import { sampleAppointments } from "./sampleData";

ReactDOM.render(<AppointmentsDayView appointments={sampleAppointments} />, document.getElementById('root'));

