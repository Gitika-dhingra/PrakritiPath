// testschedule.js
import { addSchedule, getSchedulesByPatient, markScheduleCompleted } from './scheduleController.js';

// Add a new schedule (example: medicine schedule)
await addSchedule(
  1,          // patient_id
  null,       // therapy_id (if therapy leave medicine_id null)
  1,          // medicine_id (if medicine leave therapy_id null)
  '2025-09-19', // start_date
  '2025-09-30', // end_date
  '2 times a day' // frequency
);

// Get schedules for patient 1
const schedules = await getSchedulesByPatient(1);
console.log('Schedules for patient 1:', schedules);

// Simulate end-of-schedule check
for (const schedule of schedules) {
  const today = new Date();
  const endDate = new Date(schedule.end_date);
  if (today > endDate && schedule.status !== 'completed') {
    console.log(`Patient ${schedule.patient_id}'s schedule ended. Ask if they are okay and want to continue or consult doctor.`);
    // Mark it completed
    await markScheduleCompleted(schedule.id);
  }
}
