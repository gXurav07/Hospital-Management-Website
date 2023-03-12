-- query getting all available slots of a particular date of a particular doctor
SELECT SlotID,Start,End FROM Slot WHERE  SlotID NOT IN (SELECT SlotID FROM Appointment WHERE Date='2018-04-24' and PhysicianID='1') AND SlotID NOT IN (SELECT SlotID FROM Treatment WHERE Date='2018-05-07' and PhysicianID='3');



-- query for Treatment
'SELECT Patient_Name as "Patient Name",User.Name as"Physician Name",Desc_Name as "Treatment Name",Start as "Start Time",End as "End Time" FROM Treatment_Description NATURAL JOIN Treatment NATURAL JOIN Patient NATURAL JOIN Physician NATURAL JOIN Slot,User WHERE User.EmployeeID=PhysicianID and Patient_SSN='+patient_id;
-- query for Appointment
SELECT User.Name as 'Physician Name',Patient_Name as 'Patient Name',Medication_Name as 'Medication Name',Brand as Brand,Date,AppointmentID as 'Appointment ID' FROM Prescribes_Medication NATURAL JOIN Medication NATURAL JOIN Physician NATURAL JOIN Patient,User WHERE Patient_SSN=${patient_id} and User.EmployeeID=PhysicianID;
-- query for Medication
SELECT AppointmentID as 'Appointment ID',Patient_Name as 'Patient Name',User.Name as 'Physician Name',Start as 'Start Time',End as 'End Time' FROM Appointment NATURAL JOIN Patient NATURAL JOIN Physician NATURAL JOIN Slot,User WHERE Patient_SSN=${patient_id} and  User.EmployeeID=PhysicianID;

-- query for Test 
INSERT INTO Test_instance (Test_instanceID,  Patient_SSN,PhysicianID,TestID,SlotID,Result,Test_image,Date ) `+
                    `VALUES (${body.Test_instanceID}, ${body.Patient_SSN}, ${body.PhysicianID}, '${body.TestID}', NULL,NULL,NULL,NULL);
INSERT INTO Test_instance (Test_instanceID, Patient_SSN,PhysicianID,TestID,SlotID,Result,Test_image,Date ) VALUES (1,100000004, 1, 1, NULL,NULL,NULL,NULL);                    

-- query for Treatment
INSERT INTO Treatment (TreatmentID, Patient_SSN, Treatment_DescriptionID, SlotID, PhysicianID, Date ) `+
                    `VALUES (${body.TreatmentID}, ${body.Patient_SSN}, ${body.Treatment_DescriptionID},NULL, ${body.PhysicianID}, NULL);
INSERT INTO Treatment (TreatmentID, Patient_SSN, Treatment_DescriptionID, SlotID, PhysicianID, Date ) VALUES (7,100000003,3,NULL, 2, NULL);
-- query for Appointment
INSERT INTO Appointment()
-- query for test of a patient_id
SELECT   Test_Name as "Test Name",Result,Date,Age,Gender FROM Test_instance NATURAL JOIN Test NATURAL JOIN Patient WHERE Patient_SSN=${patient_id};
-- query for getting available room numbers
SELECT RoomID FROM Room WHERE RoomID NOT IN (SELECT RoomID FROM Room WHERE Unavailable=true);
-- Admitting a patient
UPDATE Room SET Unavailable=true WHERE RoomID=${RoomID};
INSERT INTO Stay(Patient_SSN,RoomID,Start,End) VALUES(${Patient_SSN},${Room_id},${Start},NULL);
-- Discharging a patient 
UPDATE Stay SET End=${End} WHERE Patient_SSN=${Patient_SSN} and End is NULL

-- query for getting mail id of a particular doctor
SELECT Email FROM User WHERE EmployeeID=${EmployeeID};

-- query for getting all patients of a particular doctor
SELECT Patient_Name,Patient_SSN,Email,Test.Result as "Test Result",Test.Test_image as "Test Image",Test.Date as "Test Date",Desc_Name as "Treatment Name",Treatment.Date as "Treatment Date" FROM Patient NATURAL JOIN Physician NATURAL JOIN Appointment,Test,Treatment,Treatment_Description WHERE PhysicianID=${PhysicianID} and Test.Patient_SSN=Patient_SSN and Treatment.Patient_SSN=Patient_SSN and Treatment.Treatment_DescriptionID=Treatment_Description.Treatment_DescriptionID;
Here is an example code in Node.js to handle the result of the SQL query and transform it into text for sending mail:

// Assuming that the result of the SQL query is stored in a variable called 'result'

let mailText = `Dear Physician,\n\nHere are the details of your patients:\n\n`;

// Loop through each row in the result and add it to the mailText
result.forEach(row => {
  mailText += `Patient Name: ${row.Patient_Name}\n`;
  mailText += `Patient SSN: ${row.Patient_SSN}\n`;
  mailText += `Email: ${row.Email}\n`;
  mailText += `Test Result: ${row.Test Result}\n`;
  mailText += `Test Image: ${row.Test Image}\n`;
  mailText += `Test Date: ${row.Test Date}\n`;
  mailText += `Treatment Name: ${row.Treatment Name}\n`;
  mailText += `Treatment Date: ${row.Treatment Date}\n\n`;
});

// Add closing message to the mailText
mailText += `Thank you,\nYour Hospital`;

// Now you can use the mailText to send an email to the physician using a library like Nodemailer


