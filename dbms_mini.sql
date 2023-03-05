DROP TABLE IF EXISTS user;
CREATE TABLE user(
    Name varchar(255) NOT NULL,
    Email varchar(255) NOT NULL,
    employee_id varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    iv varchar(255) NOT NULL,
    type int NOT NULL,
    PRIMARY KEY (employee_id,type)
);


DROP TABLE IF EXISTS front_desk_operator;
CREATE TABLE front_desk_operator(
        e_id varchar(255) NOT NULL,
        Name varchar(255) NOT NULL,
        Address varchar(255) NOT NULL,
        PRIMARY KEY(e_id),
        FOREIGN KEY(e_id) REFERENCES user(employee_id)
);
DROP TABLE IF EXISTS data_entry_operator;
CREATE TABLE data_entry_operator(
        e_id varchar(255) NOT NULL,
        Name varchar(255) NOT NULL,
        Address varchar(255) NOT NULL,
        PRIMARY KEY(e_id),
        FOREIGN KEY(e_id) REFERENCES user(employee_id)
);
DROP TABLE IF EXISTS database_administrator;
CREATE TABLE database_administrator(
        e_id varchar(255) NOT NULL,
        Name varchar(255) NOT NULL,
        Address varchar(255) NOT NULL,
        PRIMARY KEY(e_id),
        FOREIGN KEY(e_id) REFERENCES user(employee_id)
);

DROP TABLE IF EXISTS Physician;



CREATE TABLE Physician(
    EmployeeID varchar(255) NOT NULL,
    Name varchar(255) NOT NULL,
    Position varchar(255) NOT NULL,
    SSN int NOT NULL,
    PRIMARY KEY (EmployeeID)
);

DROP TABLE IF EXISTS Patient;

CREATE TABLE Patient(
   SSN int NOT NULL AUTO_INCREMENT,
   Name varchar(255) NOT NULL,
   Address varchar(255) NOT NULL,
   Age int NOT NULL,
   Gender varchar(255) NOT NULL,
   Phone varchar(255) NOT NULL,
   InsuranceID int NOT NULL,
   PCP varchar(255) NOT NULL,
   PRIMARY KEY (SSN),
   FOREIGN KEY (PCP) REFERENCES Physician(EmployeeID) 
);
DROP TABLE IF EXISTS Department;

CREATE TABLE Department(
   DepartmentID int NOT NULL,
   Name varchar(255) NOT NULL,
   Head varchar(255) NOT NULL,
   PRIMARY KEY (DepartmentID),
   FOREIGN KEY (Head) REFERENCES Physician(EmployeeID)
);


DROP TABLE IF EXISTS `Procedure`;

CREATE TABLE `Procedure`
(
   Code int NOT NULL,
   Name varchar(255) NOT NULL,
   Cost int NOT NULL,
   PRIMARY KEY (Code)
);



DROP TABLE IF EXISTS Affiliated_with;

CREATE TABLE Affiliated_with(
   Physician varchar(255) NOT NULL,
   Department int NOT NULL,
   PrimaryAffiliation BOOLEAN NOT NULL,
   PRIMARY KEY (Physician, Department),
   FOREIGN KEY (Physician) REFERENCES Physician(EmployeeID),
   FOREIGN KEY (Department) REFERENCES Department(DepartmentID)
);

DROP TABLE IF EXISTS Room;

CREATE TABLE Room(
  Number int  NOT NULL,
  Unavailable boolean NOT NULL,
  PRIMARY KEY (Number)
);

DROP TABLE IF EXISTS Medication;

CREATE TABLE Medication(
   Code int NOT NULL,
   Name varchar(255) NOT NULL,
   Brand varchar(255) NOT NULL,
   Description varchar(255) NOT NULL,
   PRIMARY KEY (Code)
);

DROP TABLE IF EXISTS Appointment;

CREATE TABLE Appointment(
  AppointmentID int NOT NULL,
  Patient int NOT NULL,
  Physician varchar(255) NOT NULL,
  `Start` DATETIME NOT NULL,
  `End` DATETIME NOT NULL,
   ExaminationRoom varchar(255) NOT NULL,
   PRIMARY KEY (AppointmentID),
   FOREIGN KEY (Patient) REFERENCES Patient(SSN),
   FOREIGN KEY (Physician) REFERENCES Physician(EmployeeID)
);

DROP TABLE IF EXISTS Prescribes;

CREATE TABLE Prescribes(
   Physician varchar(255) NOT NULL,
   Patient int NOT NULL,
   Medication int NOT NULL,
   `Date` DATETIME NOT NULL,
    Appointment int,
    Dose varchar(255) NOT NULL,
    PRIMARY KEY (Physician, Patient, Medication, `Date`),
    FOREIGN KEY (Physician) REFERENCES Physician(EmployeeID),
    FOREIGN KEY (Patient) REFERENCES Patient(SSN),
    FOREIGN KEY (Medication) REFERENCES Medication(Code),
    FOREIGN KEY (Appointment) REFERENCES Appointment(AppointmentID)
);

DROP TABLE IF EXISTS Stay;


CREATE TABLE Stay(
   StayID int NOT NULL AUTO_INCREMENT,
    Patient int NOT NULL,
    Room int NOT NULL,
    `Start` DATETIME ,
    `End` DATETIME,
    PRIMARY KEY (StayID),
    FOREIGN KEY (Patient) REFERENCES Patient(SSN),
    FOREIGN KEY (Room) REFERENCES Room(Number)
);



DROP TABLE IF EXISTS Undergoes;

CREATE TABLE Undergoes(
    U_id int NOT NULL AUTO_INCREMENT,
    Patient int NOT NULL,
    `Procedure` int NOT NULL,
    `Date` DATETIME NULL,
    Physician varchar(255) NOT NULL,
    PRIMARY KEY (U_id),
    FOREIGN KEY (Patient) REFERENCES Patient(SSN),
    FOREIGN KEY (`Procedure`) REFERENCES `Procedure`(Code),
    FOREIGN KEY (Physician) REFERENCES Physician(EmployeeID)
);
DROP TABLE IF EXISTS Test;

CREATE TABLE Test
(
   Code int NOT NULL,
   Name varchar(255) NOT NULL,
   Cost int NOT NULL,
   PRIMARY KEY (Code)
);

DROP TABLE IF EXISTS Test_instance;
CREATE TABLE Test_instance(
    Test_Number int NOT NULL AUTO_INCREMENT,
    Patient int NOT NULL,
    Physician varchar(255) NOT NULL,
    Test_code int NOT NULL,
    `Date` DATETIME NULL,
    Result varchar(255) NULL,
    PRIMARY KEY(Test_Number),
    FOREIGN KEY (Patient) REFERENCES Patient(SSN),
    FOREIGN KEY (Physician) REFERENCES Physician(EmployeeID),
    FOREIGN KEY(Test_code) REFERENCES Test(Code)
);