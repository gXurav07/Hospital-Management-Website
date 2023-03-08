// query getting all available slots of a particular date of a particular doctor
SELECT  Start,End FROM Appointment NATURAL JOIN WHERE PhysicianID='100000001' AND Date='2018-04-24' AND SlotID NOT IN (SELECT SlotID FROM Appointment WHERE Date='2018-04-24' and PhysicianID='100000001') INTERSECT SELECT Start,End FROM Slot WHERE PhysicianID='100000001' AND Date='2018-04-24' AND SlotID NOT IN (SELECT SlotID FROM Treatment WHERE Date='2018-04-24' and PhysicianID='100000001');
SELECT Slot.Start,Slot.End
FROM Slot,Appointment
WHERE Appointment.PhysicianID='100000001' 
AND Date='2018-04-24' 
AND SlotID NOT IN (SELECT SlotID FROM Appointment WHERE Date='2018-04-24' and PhysicianID='100000001') 
INTERSECT 
SELECT Start,End 
FROM Treatment NATURAL JOIN Slot
WHERE PhysicianID='100000001' 
AND Date='2018-04-24' 
AND SlotID NOT IN (SELECT SlotID FROM Treatment WHERE Date='2018-04-24' and PhysicianID='100000001');


// query for Treatment
'SELECT Patient_Name as "Patient Name",User.Name as"Physician Name",Desc_Name as "Treatment Name",Date FROM Treatment_Description NATURAL JOIN Treatment NATURAL JOIN Patient NATURAL JOIN Physician NATURAL JOIN Slot,User WHERE User.EmployeeID=PhysicianID and Patient_SSN='+patient_id+";";
// query for Appointment
SELECT User.Name as 'Physician Name',Patient_Name as 'Patient Name',Medication_Name as 'Medication Name',Brand as Brand,Date,AppointmentID as 'Appointment ID' FROM Prescribes_Medication NATURAL JOIN Medication NATURAL JOIN Physician NATURAL JOIN Patient,User WHERE Patient_SSN=${patient_id} and User.EmployeeID=PhysicianID;
// query for Medication
SELECT AppointmentID as 'Appointment ID',Patient_Name as 'Patient Name',User.Name as 'Physician Name',Start as 'Start Time',End as 'End Time' FROM Appointment NATURAL JOIN Patient NATURAL JOIN Physician NATURAL JOIN Slot,User WHERE Patient_SSN=${patient_id} and  User.EmployeeID=PhysicianID;