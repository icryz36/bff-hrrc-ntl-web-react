import React from 'react';
import { Stack } from '@mui/material';
import { Field } from 'components/hook-form/fields';

// ----------------------------------------------------------------------

export const CandidateHobbyAndInterestForm = () => {
  return (
    <Stack direction="column" spacing={2}>
      <Field.Text name="" label="ให้นิยามตัวคุณสั้น ๆ" disabled />
      <Field.Text name="" label="เวลาว่างคุณใช้เวลาทำอะไรเป็นส่วนใหญ่ เพราะเหตุผลอะไร ?" disabled />
      <Field.Text name="" label="หนังสือเล่มล่าสุดที่อ่านคือ ?" disabled />
      <Field.Text name="" label="การพัฒนาตนเอง และการเรียนรู้ของคุณ" disabled />
      <Field.Text name="" label="งาน / กิจกรรม ที่คุณไม่คิดจะทำมาก่อน แต่คุณได้ลองทำคือ" disabled />
      <Field.Text name="" label="บรรยากาศการทำงานที่คุณชอบเป็นแบบไหน" disabled />
      <Field.Text name="" label="อะไรคือสิ่งสำคัญที่สุดของคุณในการทำงาน" disabled />
      <Field.Text name="" label="ลักษณะนิสัยที่คุณพยายามหลีกเลี่ยงมากที่สุด" disabled />
      <Field.Text name="" label="การทำงานที่สนุกของคุณเป็นแบบไหน" disabled />
      <Field.Text name="" label="ทำไมถึงสนใจในตำแหน่งนี้" disabled />
    </Stack>
  );
};
