import { useState } from 'react';
import { useParams } from 'react-router';
import { useGridApiRef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import ImportCandidateAndApplyJobTableView from 'section/import-file/candidate-and-applyjob/view/import-candidate-and-applyjob-table-view';
import { useBatchQuery } from 'services/batch/query';

const DetailBatchIDView = () => {
  const apiRef = useGridApiRef();
  const { id = '' } = useParams();
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const { data: batchDetail, isLoading } = useQuery({
    ...useBatchQuery.detail({
      pageNo: pagination.pageNo,
      pageSize: pagination.pageSize,
      batchId: id,
    }),
    enabled: !!id,
  });

  const tableTotalRecords = batchDetail?.total || 0;

  const handlePageChange = ({ page, pageSize }: { page: number; pageSize: number }) => {
    setPagination({
      pageNo: page + 1,
      pageSize,
    });
  };

  return (
    <ImportCandidateAndApplyJobTableView
      apiRef={apiRef}
      tableData={batchDetail?.items || []}
      onPageChange={handlePageChange}
      totalItem={tableTotalRecords}
      currentPage={pagination.pageNo}
      loading={isLoading}
    />
  );
};

export default DetailBatchIDView;
