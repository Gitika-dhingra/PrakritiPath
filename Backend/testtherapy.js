// testtherapy.js
import { addTherapySchedule, getTherapySchedules } from './therapyController.js';

// Add a therapy schedule
addTherapySchedule(1, 'Panchakarma Detox', '2025-09-20', 'Morning session');

// Fetch all therapy schedules for patient 1
getTherapySchedules(1);