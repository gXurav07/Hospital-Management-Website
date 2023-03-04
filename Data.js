let patients = [
    {
        Id: 1,
        Name: "Roopak",
        Age: 25,
    },
    {
        Id: 2,
        Name: "Rahul",
        Age: 30,
    },
    {
        Id: 3,
        Name: "Rajat",
        Age: 35,
    },
    {
        Id: 4,
        Name: "Raj",
        Age: 40,
    },
    {
        Id: 5,
        Name: "Arjun",
        Age: 20,
    }
]


let doctors = [
    {
        Id: 1,
        Name: "Dr. Gaurav",
        Speciality: "Cardiologist",
        Patients: [1, 2, 3]
    },
    {
        Id: 2,
        Name: "Dr. Monish",
        Speciality: "Neurologist",
        Patients: [4, 1]

    },
    {
        Id: 3,
        Name: "Dr. Abhijeet",
        Speciality: "Dermatologist",
        Patients: [5, 2, 3]
    }

]

// export
module.exports =  {patients, doctors};