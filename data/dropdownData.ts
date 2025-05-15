export type OptionItem = {
    value: string;
    label: string;
  };
  
  export const streamOptions: OptionItem[] = [
    { label: "UG", value: "UG" },
    { label: "PG", value: "PG" },
  ];
  
  export const schemeOptions: OptionItem[] = [{ label: "2022", value: "2022" }];
  
  export const yearOptions: OptionItem[] = [
    { label: "I", value: "I" },
    { label: "II", value: "II" },
    { label: "III", value: "III" },
    { label: "IV", value: "IV" },
  ];

  export const branchOptions: OptionItem[] = [
    { label: "Artificial Intelligence and Machine Learning", value: "AI/ML" },//2nd/3rd/4th  year syllabus
    { label: "Chemistry", value: "CHEM" },
    { label: "Civil Engineering", value: "Civil" },//done 1st/2nd/3rd/4th year syllabus changed CE to Civil
    { label: "Computer Science & Engineering", value: "CSE" }, //done 1s/2nd/3rd/4th year
    { label: "Electronics & Communication Engineering", value: "ECE" },//2nd/3rd/4th year syllabus  
    { label: "Electronics And Computer Science/Engineering", value: "ECSE" },
    { label: "Information Science & Engineering", value: "ISE" },
    { label: "MBA", value: "MBA" },
    { label: "Mathematics", value: "MATH" },
    { label: "Robotics and Artificial Intelligence", value: "RBAI" },// 2nd/3rd/4th year syllabus
    { label: "Biotechnology Engineering", value: "BIO" },//2nd/3rd/4th year syllabus
    { label: "Computer Science & Engineering (Data Science)", value: "CSE&DS" },//2nd/3rd/4th year syllabus
    { label: "CSE (IOT and Cybersecurity including Blockchain Technology)", value: "CSEIOTCYBER" },//2nd/3rd/4th year syllabus
    { label: "Electrical & Electronics Engineering", value: "EEE" }, //done 1st/2nd/3rd/4th year
    { label: "Electronics & Telecommunication Engineering", value: "ETE" },//done 2nd/3rd/4th year syllabus
    { label: "Department Of Humanities", value: "DH" },
    { label: "Mechanical Engineering", value: "MECH" }, //done 1s/2nd/3rd/4th year
    { label: "MCA", value: "MCA" },//done 1st/2nd
    { label: "Physics", value: "PHYSICS" },
  ];
  