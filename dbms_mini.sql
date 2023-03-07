DROP TABLE IF EXISTS User;
CREATE TABLE User(
   Name varchar(255) NOT NULL,
   Email varchar(255) NOT NULL,
   EmployeeID varchar(255) NOT NULL,
   Password varchar(255) NOT NULL,
   Pass_iv varchar(255) NOT NULL,
   Type int NOT NULL,
   PRIMARY KEY (EmployeeID, Type)
);
DROP TABLE IF EXISTS Front_desk_operator;
CREATE TABLE Front_desk_operator(
   EmployeeID varchar(255) NOT NULL,
   Name varchar(255) NOT NULL,
   Address varchar(255) NOT NULL,
   PRIMARY KEY(EmployeeID),
   FOREIGN KEY(EmployeeID) REFERENCES User(EmployeeID)
);
DROP TABLE IF EXISTS Data_entry_operator;
CREATE TABLE Data_entry_operator(
   EmployeeID varchar(255) NOT NULL,
   Name varchar(255) NOT NULL,
   Address varchar(255) NOT NULL,
   PRIMARY KEY(EmployeeID),
   FOREIGN KEY(EmployeeID) REFERENCES User(EmployeeID)
);
DROP TABLE IF EXISTS Database_administrator;
CREATE TABLE Database_administrator(
   EmployeeID varchar(255) NOT NULL,
   Name varchar(255) NOT NULL,
   Address varchar(255) NOT NULL,
   PRIMARY KEY(EmployeeID),
   FOREIGN KEY(EmployeeID) REFERENCES User(EmployeeID)
);
DROP TABLE IF EXISTS Physician;
CREATE TABLE Physician(
   PhysicianID varchar(255) NOT NULL,
   Physician_Name varchar(255) NOT NULL,
   Position varchar(255) NOT NULL,
   PRIMARY KEY (PhysicianID),
   FOREIGN KEY (PhysicianID) REFERENCES User(EmployeeID)
);
DROP TABLE IF EXISTS Patient;
CREATE TABLE Patient(
   Patient_SSN int NOT NULL,
   Patient_Name varchar(255) NOT NULL,
   Address varchar(255) NOT NULL,
   Age int NOT NULL,
   Gender varchar(255) NOT NULL,
   Phone varchar(255) NOT NULL,
   Email varchar(255) NOT NULL,
   Status varchar(255) NOT NULL,
   InsuranceID int NOT NULL,
   PRIMARY KEY (Patient_SSN)
);
DROP TABLE IF EXISTS Slot;
CREATE TABLE Slot(
   SlotID int NOT NULL ,
   `Start` DATETIME NOT NULL,
   `End` DATETIME NOT NULL,
   PRIMARY KEY (SlotID)
);
DROP TABLE IF EXISTS Department;
CREATE TABLE Department(
   DepartmentID int NOT NULL,
   Dep_Name varchar(255) NOT NULL,
   Head varchar(255) NOT NULL,
   PRIMARY KEY (DepartmentID),
   FOREIGN KEY (Head) REFERENCES Physician(PhysicianID)
);
DROP TABLE IF EXISTS Treatment_Description;
CREATE TABLE Treatment_Description (
   Treatment_DescriptionID int NOT NULL,
   Desc_Name varchar(255) NOT NULL,
   Cost int NOT NULL,
   PRIMARY KEY (Treatment_DescriptionID)
);
DROP TABLE IF EXISTS Affiliated_with;
CREATE TABLE Affiliated_with(
   PhysicianID varchar(255) NOT NULL,
   Department int NOT NULL,
   PRIMARY KEY (PhysicianID, Department),
   FOREIGN KEY (PhysicianID) REFERENCES Physician(PhysicianID),
   FOREIGN KEY (Department) REFERENCES Department(DepartmentID)
);
DROP TABLE IF EXISTS Room;
CREATE TABLE Room(
   RoomID int NOT NULL,
   Unavailable boolean NOT NULL,
   PRIMARY KEY (RoomID)
);
DROP TABLE IF EXISTS Medication;
CREATE TABLE Medication(
   MedicationID int NOT NULL,
   Medication_Name varchar(255) NOT NULL,
   Brand varchar(255) NOT NULL,
   Description varchar(255) NOT NULL,
   PRIMARY KEY (MedicationID)
);
DROP TABLE IF EXISTS Appointment;
CREATE TABLE Appointment(
   AppointmentID int NOT NULL,
   Patient_SSN int NOT NULL,
   PhysicianID varchar(255) NOT NULL,
   Date DATETIME NOT NULL,
   SlotID int NOT NULL,
   ExaminationRoom varchar(255) NOT NULL,
   PRIMARY KEY (AppointmentID),
   FOREIGN KEY (Patient_SSN) REFERENCES Patient(Patient_SSN),
   FOREIGN KEY (PhysicianID) REFERENCES Physician(PhysicianID),
   FOREIGN KEY (SlotID) REFERENCES Slot(SlotID)
);
DROP TABLE IF EXISTS Prescribes_Medication;
CREATE TABLE Prescribes_Medication(
   PhysicianID varchar(255) NOT NULL,
   Patient_SSN int NOT NULL,
   MedicationID int NOT NULL,
   `Date` DATETIME NOT NULL,
   AppointmentID int,
   Dose varchar(255) NOT NULL,
   PRIMARY KEY (PhysicianID, Patient_SSN, MedicationID, `Date`),
   FOREIGN KEY (PhysicianID) REFERENCES Physician(PhysicianID),
   FOREIGN KEY (Patient_SSN) REFERENCES Patient(Patient_SSN),
   FOREIGN KEY (MedicationID) REFERENCES Medication(MedicationID),
   FOREIGN KEY (AppointmentID) REFERENCES Appointment(AppointmentID)
);
DROP TABLE IF EXISTS Stay;
CREATE TABLE Stay(
   StayID int NOT NULL AUTO_INCREMENT,
   Patient_SSN int NOT NULL,
   RoomID int NOT NULL,
   `Start` DATETIME,
   `End` DATETIME,
   PRIMARY KEY (StayID),
   FOREIGN KEY (Patient_SSN) REFERENCES Patient(Patient_SSN),
   FOREIGN KEY (RoomID) REFERENCES Room(RoomID)
);
DROP TABLE IF EXISTS Treatment;
CREATE TABLE Treatment(
   TreatmentID int NOT NULL AUTO_INCREMENT,
   Patient_SSN int NOT NULL,
   Treatment_DescriptionID int NOT NULL,
   SlotID int,
   PhysicianID varchar(255) NOT NULL,
   PRIMARY KEY (TreatmentID),
   FOREIGN KEY (Patient_SSN) REFERENCES Patient(Patient_SSN),
   FOREIGN KEY (Treatment_DescriptionID) REFERENCES Treatment_Description(Treatment_DescriptionID),
   FOREIGN KEY (PhysicianID) REFERENCES Physician(PhysicianID),
   FOREIGN KEY (SlotID) REFERENCES Slot(SlotID)
);
DROP TABLE IF EXISTS Test;
CREATE TABLE Test (
   TestID int NOT NULL,
   Test_Name varchar(255) NOT NULL,
   Cost int NOT NULL,
   PRIMARY KEY (TestID)
);
DROP TABLE IF EXISTS Test_instance;
CREATE TABLE Test_instance(
   Test_instanceID int NOT NULL AUTO_INCREMENT,
   Patient_SSN int NOT NULL,
   PhysicianID varchar(255) NOT NULL,
   TestID int NOT NULL,
   SlotID int ,
   Result varchar(255) NULL,
   Test_image LONGBLOB NULL,
   PRIMARY KEY (Test_instanceID),
   FOREIGN KEY (Patient_SSN) REFERENCES Patient(Patient_SSN),
   FOREIGN KEY (PhysicianID) REFERENCES Physician(PhysicianID),
   FOREIGN KEY (TestID) REFERENCES Test(TestID),
   FOREIGN KEY (SlotID) REFERENCES Slot(SlotID)
);
