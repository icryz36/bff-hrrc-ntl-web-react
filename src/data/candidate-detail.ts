export const CANDIDATE_DETIAL = {
  candidate: {
    candidateId: 'f19d1c7a-8f3a-4d13-a249-3fd901b34811',
    idNo: '1234567890123',
    title: {
      titleId: '213232131231',
      titleNameTh: 'นาย',
      titleNameEn: 'Mr.',
    },
    nameTh: 'สมชาย',
    nameEn: 'Somchai',
    surnameTh: 'ใจดี',
    surnameEn: 'Jaidee',
    nickname: 'ชาย',
    gender: 'M',
    age: 23,
    email: 'somchai@example.com',
    desiredProvinces: [
      {
        provinceId: '1',
        provinceName: 'กรุงเทพมหานคร',
      },
      {
        provinceId: '2',
        provinceName: 'เชียงใหม่',
      },
    ],

    desiredLocation: 'ใกล้ BTS',
    maritalStatus: 'Single',
    militaryStatus: 'Exempted',
    candriveCar: 'Y',
    hascarLicense: 'Y',
    candriveMotorcycle: 'N',
    hasmotorcycleLicense: 'N',
    linkReference: 'https://linkedin.com/somchai',
    workExperience: 'มีประสบการณ์ด้านงานขาย 2 ปี',
    address: '123 ถนนสุขุมวิท เขตวัฒนา กรุงเทพ',
    note: 'พร้อมเริ่มงานทันที',
    height: '175',
    weight: '68',
    nationality: 'Thai',
    religion: 'Buddhist',
    bloodGroup: 'O',
    placeofBirth: {
      provinceId: '1',
      provinceName: 'กรุงเทพมหานคร',
    },
    cardissuedDate: '2022-01-01',
    cardexpiredDate: '2032-01-01',
    cardissuedProvince: {
      provinceId: '10',
      provinceName: 'นนทบุรี',
    },
    lineId: 'somchai123',
    status: 'Active',
    isBlacklist: false,
    blacklistReason: '',
    highestdegreeId: 'deg001',
    isRead: 'true',
  },
  jobApplications: [
    {
      jobAppId: 'H0001',
      jobTitle:
        'เจ้าหน้าที่บริหารงานขายสาขา ปฏิบัติงาน สาขาสุขสวัสดิ์ 76 สาขาสุขสวัสดิ์ 84 สาขาตลาดพระประแดง สาขาซอยพุทธบูชา 44 สาขาประชาอุทิศ 90 สาขาพระประแดง xxxxxxxxxxx',
      ownerName: 'สมปอง มั่นทำดี',
      jobStatus: {
        jobAppStatusMasterId: '1',
        statusNameTh: 'New',
        statusNameEn: 'New',
      },
      applicationDate: '10/11/2025',
      updatedDate: '10/11/2025',
    },
    {
      jobAppId: 'H00002',
      jobTitle: 'เจ้าหน้าที่บริหารงานขายสาขา',
      ownerName: 'สมปอง มั่นทำดี',
      jobStatus: {
        jobAppStatusMasterId: '2',
        statusNameTh: 'Interview',
        statusNameEn: 'Interview',
      },
      applicationDate: '10/11/2025',
      updatedDate: '10/11/2025',
    },
  ],
  ducuments: [
    {
      ducumentId: 'doc001',
      filePath: '/uploads/resume.pdf',
      ducumentType: {
        documentTypeId: '1',
        docTypeNameTh: 'เรซูเม่',
        docTypeNameEn: 'Resume',
      },
    },
    {
      ducumentId: 'doc002',
      filePath: '/uploads/certificate.pdf',
      ducumentType: {
        documentTypeId: '2',
        docTypeNameTh: 'ใบรับรอง',
        docTypeNameEn: 'Certificate',
      },
    },
  ],

  familys: [
    {
      relationship: 'Father',
      name: 'สมบัติ ใจดี',
      age: 50,
      mobileNo: '0899999999',
      occupation: 'ธุรกิจส่วนตัว',
      workplace: 'ร้านค้าอุปกรณ์',
      isEmergency: true,
    },
    {
      relationship: 'Mother',
      name: 'สมศรี ใจดี',
      age: 48,
      mobileNo: '0898888888',
      occupation: 'แม่บ้าน',
      workplace: '-',
      isEmergency: false,
    },
  ],

  educations: [
    {
      candidateEducationId: 'edu001',
      degree: {
        degreeId: 'bachelor01',
        degreeNameEn: 'Bachelor of Business Administration',
        degreeNameTh: 'บริหารธุรกิจบัณฑิต',
        degreeCode: 'BBA',
        degreeLevel: 'Bachelor',
      },
      startYear: '2018',
      endYear: '2022',
      institutionName: 'มหาวิทยาลัยกรุงเทพ',
      major: 'การตลาด',
      gpa: '3.45',
    },
  ],

  referencePersons: [
    {
      referencePersonId: 'ref001',
      name: 'นายประวิทย์ มั่งมี',
      position: 'หัวหน้าฝ่ายขาย',
      relation: 'อดีตหัวหน้างาน',
      workplace: 'ABC Sales Co., Ltd.',
      mobileNo: '0812345678',
    },
  ],

  skills: [
    {
      skillId: 'skill001',
      skillNameTh: 'การขาย',
      skillNameEn: 'Sales',
      skillCategory: 'Soft skill',
      skillOptionType: 'single',
      isSkillFreeText: false,
      skillOptions: [
        {
          skilOptionId: 'opt01',
          skillTextTh: 'พื้นฐาน',
          skillTextEn: 'Basic',
        },
        {
          skilOptionId: 'opt02',
          skillTextTh: 'ระดับกลาง',
          skillTextEn: 'Intermediate',
        },
      ],
      skillText: '',
      selectedOptionId: 'opt02',
    },
  ],

  nlInsBrokerLicenseNo: '12345',
  nlInsAgentLicenseNo: '54321',
  lInsBrokerLicenseNo: 'A98765',
  lInsAgentLicenseNo: 'B56789',

  workHistorys: [
    {
      workHistoryId: 'work001',
      companyName: 'XYZ Trading Co., Ltd.',
      officePhoneNo: '02-123-4567',
      startDate: '2021-03-01',
      endDate: '2023-04-30',
      businessType: 'Retail',
      lastPosition: 'Sales Representative',
      responsibilities: 'ติดต่อประสานงานลูกค้า, นำเสนอสินค้า, ทำยอดขาย',
      salary: 15000,
      otherIncome: 3000,
      leavingReason: 'ต้องการความก้าวหน้า',
    },
  ],

  recommender: {
    recommenderId: 'rec001',
    name: 'นายกิจติพงษ์ ใจดี',
    relation: 'ญาติ',
    position: 'Supervisor',
    mobileNo: '0822222222',
  },

  questions: [
    {
      questionCategory: {
        questionId: 'q001',
        questionTextTh: 'พร้อมเดินทางไปต่างจังหวัดหรือไม่?',
        questionTextEn: 'Are you willing to travel upcountry?',
        isRequired: true,
        answerText: '',
        answerOptionId: '1',
        questionOptionType: 'single',
        answerOptions: [
          {
            optionId: '1',
            optionTextTh: 'ใช่',
            optionTextEn: 'Yes',
            optionScore: '10',
          },
          {
            optionId: '2',
            optionTextTh: 'ไม่',
            optionTextEn: 'No',
            optionScore: '0',
          },
        ],
      },
    },
  ],
};
