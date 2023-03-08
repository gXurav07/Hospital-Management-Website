// query getting all available slots of a particular date of a particular doctor
SELECT SlotID,Start,End FROM Slot WHERE  SlotID NOT IN (SELECT SlotID FROM Appointment WHERE Date='2018-04-24' and PhysicianID='1') AND SlotID NOT IN (SELECT SlotID FROM Treatment WHERE Date='2018-05-07' and PhysicianID='3');



// query for Treatment
'SELECT Patient_Name as "Patient Name",User.Name as"Physician Name",Desc_Name as "Treatment Name",Start as "Start Time",End as "End Time" FROM Treatment_Description NATURAL JOIN Treatment NATURAL JOIN Patient NATURAL JOIN Physician NATURAL JOIN Slot,User WHERE User.EmployeeID=PhysicianID and Patient_SSN='+patient_id;
// query for Appointment
SELECT User.Name as 'Physician Name',Patient_Name as 'Patient Name',Medication_Name as 'Medication Name',Brand as Brand,Date,AppointmentID as 'Appointment ID' FROM Prescribes_Medication NATURAL JOIN Medication NATURAL JOIN Physician NATURAL JOIN Patient,User WHERE Patient_SSN=${patient_id} and User.EmployeeID=PhysicianID;
// query for Medication
SELECT AppointmentID as 'Appointment ID',Patient_Name as 'Patient Name',User.Name as 'Physician Name',Start as 'Start Time',End as 'End Time' FROM Appointment NATURAL JOIN Patient NATURAL JOIN Physician NATURAL JOIN Slot,User WHERE Patient_SSN=${patient_id} and  User.EmployeeID=PhysicianID;