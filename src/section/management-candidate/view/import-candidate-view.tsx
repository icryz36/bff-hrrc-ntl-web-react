// ---------------------------------------------------------------------
import FileDropZone from 'components/base/FileDropZone';

const ImportCandidateView = () => {
  return (
    <>
      <FileDropZone
        maxSize={2 * 1024 * 1024}
        onDrop={(acceptedFiles) => {
          console.log({ acceptedFiles });
        }}
        // description="รองรับไฟล์ .xlxs, .xls and .csv, ขนาดไฟล์ไม่เกิน is 50 MB"
        accept={{
          'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
          'application/pdf': ['.pdf'],
        }}
      />
    </>
  );
};

export default ImportCandidateView;
