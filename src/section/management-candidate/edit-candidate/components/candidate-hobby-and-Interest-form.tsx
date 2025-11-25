import React from 'react';
import { Stack } from '@mui/material';
import { Field } from 'components/hook-form/fields';

// ----------------------------------------------------------------------

export const CandidateHobbyAndInterestForm = () => {
  return (
    <Stack direction="column" spacing={2}>
      <Field.Text name="" label="ให้นิยามตัวคุณสั้น ๆ" />
      <Field.Text name="" label="เวลาว่างคุณใช้เวลาทำอะไรเป็นส่วนใหญ่ เพราะเหตุผลอะไร ?" />
      <Field.Text name="" label="หนังสือเล่มล่าสุดที่อ่านคือ ?" />
      <Field.Text name="" label="การพัฒนาตนเอง และการเรียนรู้ของคุณ" />
      <Field.Text name="" label="งาน / กิจกรรม ที่คุณไม่คิดจะทำมาก่อน แต่คุณได้ลองทำคือ" />
      <Field.Text name="" label="บรรยากาศการทำงานที่คุณชอบเป็นแบบไหน" />
      <Field.Text name="" label="อะไรคือสิ่งสำคัญที่สุดของคุณในการทำงาน" />
      <Field.Text name="" label="ลักษณะนิสัยที่คุณพยายามหลีกเลี่ยงมากที่สุด" />
      <Field.Text name="" label="การทำงานที่สนุกของคุณเป็นแบบไหน" />
      <Field.Text name="" label="ทำไมถึงสนใจในตำแหน่งนี้" />
    </Stack>
  );
};
