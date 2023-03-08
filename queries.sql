// query getting all available slots of a particular date of a particular doctor
SELECT SlotID,Start,End FROM Slot WHERE  SlotID NOT IN (SELECT SlotID FROM Appointment WHERE Date='2018-04-24' and PhysicianID='1') AND SlotID NOT IN (SELECT SlotID FROM Treatment WHERE Date='2018-05-07' and PhysicianID='3');



// query for Treatment
'SELECT Patient_Name as "Patient Name",User.Name as"Physician Name",Desc_Name as "Treatment Name",Start as "Start Time",End as "End Time" FROM Treatment_Description NATURAL JOIN Treatment NATURAL JOIN Patient NATURAL JOIN Physician NATURAL JOIN Slot,User WHERE User.EmployeeID=PhysicianID and Patient_SSN='+patient_id;
// query for Appointment
SELECT User.Name as 'Physician Name',Patient_Name as 'Patient Name',Medication_Name as 'Medication Name',Brand as Brand,Date,AppointmentID as 'Appointment ID' FROM Prescribes_Medication NATURAL JOIN Medication NATURAL JOIN Physician NATURAL JOIN Patient,User WHERE Patient_SSN=${patient_id} and User.EmployeeID=PhysicianID;
// query for Medication
SELECT AppointmentID as 'Appointment ID',Patient_Name as 'Patient Name',User.Name as 'Physician Name',Start as 'Start Time',End as 'End Time' FROM Appointment NATURAL JOIN Patient NATURAL JOIN Physician NATURAL JOIN Slot,User WHERE Patient_SSN=${patient_id} and  User.EmployeeID=PhysicianID;

// query for Test 
INSERT INTO Test_instance (Test_instanceID,  Patient_SSN,PhysicianID,TestID,SlotID,Result,Test_image,Date ) `+
                    `VALUES (${body.Test_instanceID}, ${body.Patient_SSN}, ${body.PhysicianID}, '${body.TestID}', NULL,NULL,NULL,NULL);
INSERT INTO Test_instance (Test_instanceID, Patient_SSN,PhysicianID,TestID,SlotID,Result,Test_image,Date ) VALUES (1,100000004, 1, 1, NULL,NULL,NULL,NULL);                    

// query for Treatment
INSERT INTO Treatment (TreatmentID, Patient_SSN, Treatment_DescriptionID, SlotID, PhysicianID, Date ) `+
                    `VALUES (${body.TreatmentID}, ${body.Patient_SSN}, ${body.Treatment_DescriptionID},NULL, ${body.PhysicianID}, NULL);
INSERT INTO Treatment (TreatmentID, Patient_SSN, Treatment_DescriptionID, SlotID, PhysicianID, Date ) VALUES (7,100000003,3,NULL, 2, NULL);
// query for Appointment
INSERT INTO Appointment()
// query for test of a patient_id
SELECT   Test_Name,Result,Date,Age,Gender FROM Test_instance NATURAL JOIN Test NATURAL JOIN Patient WHERE Patient_SSN=${patient_id};