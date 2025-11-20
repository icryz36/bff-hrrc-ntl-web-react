export const SKILLS = [
  {
    skillId: 'a1f7f2c3-1b5c-4e2a-9c11-9c3b5b1fd001',
    skillNameTh: 'ทักษะการเขียนโปรแกรม Frontend',
    skillNameEn: 'Frontend Development',
    skillCategory: 'Technical',
    skillOptionType: 'Checkbox', // Dropdown | Checkbox | Radio
    isSkillFreeText: false,
    skillOptions: [
      {
        skillOptionId: 'f101f7d3-3a9c-4b4a-9f10-1001c0ffee01',
        skillTextTh: 'React.js',
        skillTextEn: 'React.js',
      },
      {
        skillOptionId: 'b9f0b4ee-45ff-4f08-a2e1-2001c0ffee02',
        skillTextTh: 'Vue.js',
        skillTextEn: 'Vue.js',
      },
      {
        skillOptionId: '0f1b3d22-9e7a-4cc2-a7e3-3001c0ffee03',
        skillTextTh: 'Angular',
        skillTextEn: 'Angular',
      },
    ],
  },
  {
    skillId: 'b2c8f4a5-2c6d-4d01-9e21-8a4b6a2ed002',
    skillNameTh: 'ระดับทักษะภาษาอังกฤษ',
    skillNameEn: 'English Proficiency',
    skillCategory: 'Language',
    skillOptionType: 'Dropdown',
    isSkillFreeText: false,
    skillOptions: [
      {
        skillOptionId: '31b0f9d1-7d2c-4bca-a5ff-4001c0ffee04',
        skillTextTh: 'พื้นฐาน',
        skillTextEn: 'Basic',
      },
      {
        skillOptionId: '8fa0c8d2-5b9d-4f79-9a0d-5001c0ffee05',
        skillTextTh: 'ปานกลาง',
        skillTextEn: 'Intermediate',
      },
      {
        skillOptionId: '7e9a2f44-2c4e-4d8d-9f2e-6001c0ffee06',
        skillTextTh: 'ดีมาก',
        skillTextEn: 'Advanced',
      },
    ],
  },
  {
    skillId: 'c3d9e5b6-3d7e-4f11-8f31-7b5c7b3fe003',
    skillNameTh: 'ทักษะการสื่อสาร',
    skillNameEn: 'Communication',
    skillCategory: 'Soft Skill',
    skillOptionType: 'Radio',
    isSkillFreeText: false,
    skillOptions: [
      {
        skillOptionId: '5ad0f842-6b2d-4e0a-9e77-7001c0ffee07',
        skillTextTh: 'ต้องพัฒนา',
        skillTextEn: 'Needs Improvement',
      },
      {
        skillOptionId: '9ce0f953-7c3e-4f1b-9f88-8001c0ffee08',
        skillTextTh: 'ดี',
        skillTextEn: 'Good',
      },
      {
        skillOptionId: 'ac10f964-8d4f-401c-8a99-9001c0ffee09',
        skillTextTh: 'ดีเยี่ยม',
        skillTextEn: 'Excellent',
      },
    ],
  },
  {
    skillId: 'd4ead6c7-4e8f-4a21-9f41-6c6d8c4ff004',
    skillNameTh: 'ทักษะการบริหารทีม',
    skillNameEn: 'Team Management',
    skillCategory: 'Management',
    skillOptionType: 'Dropdown',
    isSkillFreeText: true, // เลือกจาก dropdown และพิมพ์เพิ่มเติมได้
    skillOptions: [
      {
        skillOptionId: '1de0fa75-9e5f-4b2d-9b10-a001c0ffee10',
        skillTextTh: 'ไม่มีประสบการณ์',
        skillTextEn: 'No experience',
      },
      {
        skillOptionId: '2ef0ab86-af60-4c3e-8c21-b001c0ffee11',
        skillTextTh: 'บริหารทีมขนาดเล็ก (1-5 คน)',
        skillTextEn: 'Small team (1-5 members)',
      },
      {
        skillOptionId: '3f01bc97-b071-4d4f-8d32-c001c0ffee12',
        skillTextTh: 'บริหารทีมขนาดกลางขึ้นไป',
        skillTextEn: 'Medium/Large team',
      },
    ],
  },
  {
    skillId: 'e5fbe7d8-5f90-4b31-8f51-5d7e9d5ff005',
    skillNameTh: 'ทักษะการใช้เครื่องมือ QA / Testing',
    skillNameEn: 'QA / Testing Tools',
    skillCategory: 'Technical',
    skillOptionType: 'Checkbox',
    isSkillFreeText: true,
    skillOptions: [
      {
        skillOptionId: '4a02cd18-c182-4e50-9e43-d001c0ffee13',
        skillTextTh: 'Jest',
        skillTextEn: 'Jest',
      },
      {
        skillOptionId: '5b03de29-d293-4f61-8f54-e001c0ffee14',
        skillTextTh: 'Cypress',
        skillTextEn: 'Cypress',
      },
      {
        skillOptionId: '6c04ef3a-e3a4-4f72-9f65-f001c0ffee15',
        skillTextTh: 'Playwright',
        skillTextEn: 'Playwright',
      },
    ],
  },
  {
    skillId: 'f6gce8e9-60a1-4c41-9f61-4e8f0e6ff006',
    skillNameTh: 'ทักษะอื่น ๆ',
    skillNameEn: 'Other Skills',
    skillCategory: 'Other',
    skillOptionType: 'Radio',
    isSkillFreeText: true, // radio + ช่องให้กรอกเอง
    skillOptions: [
      {
        skillOptionId: '7d05f04b-f4b5-4f83-8f76-0102c0ffee16',
        skillTextTh: 'ระบุเอง',
        skillTextEn: 'Custom',
      },
    ],
  },
];
