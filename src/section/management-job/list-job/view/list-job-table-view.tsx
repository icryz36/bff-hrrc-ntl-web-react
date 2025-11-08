import { RefObject, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {Box, Button, Chip, ChipOwnProps, Stack, Typography, Link, Checkbox, FormControlLabel, Grid} from '@mui/material';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridColDef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import DataGridPagination from 'components/pagination/DataGridPagination';
import DashboardMenu from 'components/common/DashboardMenu';
import CustomConfirmDialog from "components/custom-confirm-dialog/CustomDialog";
import {useBoolean} from "hooks/useBoolean";
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import IconifyIcon from "components/base/IconifyIcon.tsx";

export interface IListJobData {
    id: number;
    jobPostID: string;
    jobTitle: string,
    department: string,
    regional: string,
    province: string,
    district: string,
    startDate: string,
    activeDay: string,
    hc: string,
    owner: string,
    jobStatus: string,
}

export const ListJobData: IListJobData[] = [
    {
        id: 1,
        jobPostID: 'H0001',
        jobTitle: 'Treasury cccc',
        department: 'Finance & Accounting',
        regional: 'Head Office',
        province: 'Province 01',
        district: 'District 01, District 02',
        startDate: '01/10/2025',
        activeDay: '9 Day',
        hc: '1',
        owner: 'Chaiya Phongthun',
        jobStatus: 'open',
    },
]

const getStatusBadgeColor = (val: string): ChipOwnProps['color'] => {
    switch (val) {
        case 'open':
            return 'success';
        case 'close':
            return 'neutral';
        case 'hold':
            return 'warning';
        case 'cancel':
            return 'error';
        default:
            return 'primary';
    }
};

const defaultPageSize = 8;

interface ProductsTableProps {
    apiRef: RefObject<GridApiCommunity | null>;
    filterButtonEl: HTMLButtonElement | null;
}

const ListJobTableView = ({ apiRef, filterButtonEl }: ProductsTableProps) => {
    const navigate = useNavigate();
    const isOpenConfirmDeleteDialog = useBoolean();
    const isOpenDetailDialog = useBoolean();
    const columns: GridColDef<IListJobData>[] = useMemo(
        () => [
            {
                ...GRID_CHECKBOX_SELECTION_COL_DEF,
                width: 64,
            },
            {
                field: 'jobPostID',
                headerName: 'Job Post ID',
                minWidth: 148,
                flex: 1,
                renderCell: (params) => {
                    return <Link onClick={isOpenDetailDialog.onTrue}>{params.row.jobPostID}</Link>;
                },
            },
            {
                field: 'jobTitle',
                headerName: 'Job Title',
                minWidth: 330,
            },
            {
                field: 'department',
                headerName: 'Department',
                minWidth: 160,
            },
            {
                field: 'regional',
                headerName: 'NTL Regional',
                minWidth: 160,
            },
            {
                field: 'province',
                headerName: 'Province',
                minWidth: 160,
            },
            {
                field: 'district',
                headerName: 'District',
                minWidth: 160,
                filterable: false,
            },
            {
                field: 'startDate',
                headerName: 'Start Date',
                minWidth: 160,
                filterable: false,
            },
            {
                field: 'activeDay',
                headerName: 'Active Day',
                minWidth: 130,
                filterable: false,
            },
            {
                field: 'hc',
                headerName: 'HC',
                minWidth: 80,
                filterable: false,
            },
            {
                field: 'owner',
                headerName: 'Owner',
                minWidth: 150,
                filterable: false,
            },
            {
                field: 'jobStatus',
                headerName: 'Job Status',
                minWidth: 130,
                headerClassName: 'job-status-header',
                cellClassName: 'job-status-cell',
                renderCell: (params) => {
                    return (
                        <Chip
                            label={params.row.jobStatus}
                            variant="soft"
                            color={getStatusBadgeColor(params.row.jobStatus)}
                            sx={{ textTransform: 'capitalize' }}
                        />
                    );
                },
            },
            {
                field: 'action',
                headerName: 'Actions',
                filterable: false,
                sortable: false,
                width: 90,
                align: 'center',
                headerAlign: 'right',
                headerClassName: 'action-header',
                cellClassName: 'action-cell',
                renderCell: () => <DashboardMenu menuItems={[
                    {
                        label: 'Edit',
                        icon: 'mdi-light:pencil',
                        onClick: () => {}
                    },
                    {
                        label: 'Duplicate',
                        icon: 'material-symbols-light:file-copy-outline',
                        onClick: () => {}
                    },
                    {
                        label: 'Delete',
                        icon: 'material-symbols-light:delete-outline-sharp',
                        onClick: () => {
                            isOpenConfirmDeleteDialog.onTrue()
                        }
                    }
                ]} />,
            },
        ],
        [],
    );


    const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
        <Stack direction="row" gap={2}>
            <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
            <Typography variant="body2" fontWeight={500}>{value}</Typography>
        </Stack>
    );

    const SectionTitle = ({ title }: { title: string }) => (
        <Typography variant="h6" fontWeight={600}>
            {title}
        </Typography>
    );


    return (
        <>
        <Box width={1}>
            <DataGrid
                rowHeight={64}
                rows={ListJobData}
                apiRef={apiRef}
                columns={columns}
                disableVirtualization
                pageSizeOptions={[defaultPageSize, 15]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: defaultPageSize,
                        },
                    },
                }}
                checkboxSelection
                slots={{
                    basePagination: (props) => <DataGridPagination showFullPagination {...props} />,
                }}
                slotProps={{
                    panel: {
                        target: filterButtonEl,
                    },
                }}
                sx={{
                    "& .MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "#E31837",
                        color: "#fff",
                    },
                    "& .job-status-cell": {
                        position: "sticky",
                        right: 90,
                        background: "#FFF",
                        zIndex: 5,
                        boxShadow: "-5px 0px 10px 0px #0000000D"
                },
                    "& .job-status-header": {
                        position: "sticky",
                        right: 90,
                        background: "#F7FAFC",
                        zIndex: 5,
                        boxShadow: "-5px 0px 10px 0px #0000000D"
                    },
                    "& .action-cell": {
                        position: "sticky",
                        right: 0,
                        background: "#fff",
                        zIndex: 6,
                    },
                    "& .action-header": {
                        position: "sticky",
                        right: 0,
                        background: "#F7FAFC",
                        zIndex: 6,
                    },
                    "& .MuiDataGrid-row, .MuiDataGrid-columnHeaders": {
                        overflow: "visible !important",
                    },
                }}
            />
        </Box>
            <CustomConfirmDialog
                title="ยืนยันการลบข้อมูล"
                open={isOpenConfirmDeleteDialog.value}
                onClose={isOpenConfirmDeleteDialog.onFalse}
                description={
                    <Typography color="text.secondary" variant="subtitle1" whiteSpace="pre-wrap">
                        {'คุณต้องการลบข้อมูลนี้หรือไม่?\nหากลบแล้วจะไม่สามารถกู้ข้อมูลนี้ได้อีก'}
                    </Typography>
                }
                action={
                    <Stack spacing={1}>
                        <Button variant="outlined" color="neutral" onClick={isOpenConfirmDeleteDialog.onFalse}>
                            Cancel
                        </Button>
                        <Button variant="contained" sx={{ backgroundColor: '#E31837' }} >Delete</Button>
                    </Stack>
                }
            />
            <Drawer
                anchor="bottom"
                open={isOpenDetailDialog.value}
                sx={{
                    [`& .${drawerClasses.paper}`]: {
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        height: '100vh',
                    },
                }}
            >
                <Stack
                    sx={{
                        height: '100%',
                        width: '820px',
                        margin: 'auto',
                        py: 6,
                        position: 'relative',
                    }}
                    spacing={4}
                    direction="column"
                >
                    {/* Close */}
                    <IconifyIcon
                        icon="material-symbols-light:close-rounded"
                        fontSize="32px"
                        color="#111417"
                        sx={{ position: 'absolute', top: 20, right: 20, cursor: 'pointer' }}
                        onClick={isOpenDetailDialog.onFalse}
                    />

                    {/* Title */}
                    <Typography variant="h4" fontWeight={600}>
                        Job Post Detail : H00001
                    </Typography>

                    {/* Job Detail Header */}
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" fontWeight={600}>
                            Job Detail
                        </Typography>

                        <FormControlLabel
                            control={<Checkbox name="checked" color="primary" size="small" />}
                            label={
                                <Typography variant="subtitle2" color="text.secondary">
                                    Big Event
                                </Typography>
                            }
                        />
                    </Stack>

                    {/* Job Info Table */}
                    <Stack spacing={2} direction="column" px={3} py={0}>
                        <InfoRow label="Job Title" value="Sr/Mgr Risk Mitigation Strategy and Collateral Management" />
                        <Grid container spacing={2}>
                            <Grid size={{ md: 6 }}>
                                <InfoRow label="Group Location" value="HO" />
                            </Grid>
                            <Grid size={{ md: 6 }}>
                                <InfoRow label="NTL Regional" value="Head Office" />
                            </Grid>
                            <Grid size={{ md: 6 }}>
                                <InfoRow label="Headcount" value="5" />
                            </Grid>
                            <Grid size={{ md: 6 }}>
                                <InfoRow label="PR Number" value="HCYYYYMM-000000" />
                            </Grid>
                            <Grid size={{ md: 6 }}>
                                <InfoRow label="Job Post ID" value="H00001" />
                            </Grid>
                            <Grid size={{ md: 6 }}>
                                <InfoRow
                                    label="Job Status"
                                    value={<Chip label="Open" color="success" variant="soft" />}
                                />
                            </Grid>
                        </Grid>
                    </Stack>

                   <Box px={4} py={2} bgcolor={'#F7FAFC'}>
                        <SectionTitle title="Position" />
                        <Grid container spacing={2}>
                            <Grid size={{ md: 4 }}>
                                <InfoRow label="Position No. From HRMS" value="N000001" />
                            </Grid>
                            <Grid size={{ md: 4 }}>
                                <InfoRow label="Rationale of Vacancy" value="Replacement" />
                            </Grid>
                            <Grid size={{ md: 4 }}>
                                <InfoRow label="Source of Recruitment" value="Internal Only" />
                            </Grid>
                            <Grid size={{ md: 4 }}>
                                <InfoRow label="Position No. From HRMS" value="N000004" />
                            </Grid>
                            <Grid size={{ md: 4 }}>
                                <InfoRow label="Rationale of Vacancy" value="Replacement" />
                            </Grid>
                            <Grid size={{ md: 4 }}>
                                <InfoRow label="Source of Recruitment" value="Internal Only" />
                            </Grid>
                            <Grid size={{ md: 4 }}>
                                <InfoRow label="Position No. From HRMS" value="N000005" />
                            </Grid>
                            <Grid size={{ md: 4 }}>
                                <InfoRow label="Rationale of Vacancy" value="Replacement" />
                            </Grid>
                            <Grid size={{ md: 4 }}>
                                <InfoRow label="Source of Recruitment" value="Internal Only" />
                            </Grid>
                        </Grid>
                   </Box>

                    <Box px={4} py={2} bgcolor={'#F7FAFC'}>
                        <SectionTitle title="Work Location" />
                        <Grid container spacing={2}>
                            <Grid size={{ md: 6 }}>
                                <InfoRow label="Province" value="Province" />
                            </Grid>
                            <Grid size={{ md: 6 }}>
                                <InfoRow label="District" value="District01, District02" />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box px={4} py={2} bgcolor={'#F7FAFC'}>
                        <SectionTitle title="Department" />
                        <Grid container spacing={2}>
                            <Grid size={{ md: 6 }}>
                                <InfoRow label="Department" value="เงินติดล้อ" />
                            </Grid>
                            <Grid size={{ md: 6 }}>
                                <InfoRow label="Section" value="เงินติดล้อ" />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box px={4} py={2} bgcolor={'#F7FAFC'}>
                        <SectionTitle title="Type of Employee" />
                        <Grid container spacing={2}>
                            <Grid size={{ md: 6 }}>
                                <InfoRow label="Job Level" value="Officer/Branch Staff 1" />
                            </Grid>
                            <Grid size={{ md: 6 }}>
                                <InfoRow label="Degree" value="ปริญญาตรี" />
                            </Grid>
                            <Grid size={{ md: 6 }}>
                                <InfoRow label="Employee Type" value="งานประจำ" />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box px={4} py={2}>
                        <Grid container spacing={2}>
                            <Grid size={{ md: 4 }}>
                                <InfoRow label="Start Date" value="01/10/2025" />
                            </Grid>
                            <Grid size={{ md: 4 }}>
                                <InfoRow label="End Date" value="01/10/2025" />
                            </Grid>
                            <Grid size={{ md: 4 }}>
                                <InfoRow label="Acknowledge Date" value="01/10/2025" />
                            </Grid>
                            <Grid size={{ md: 6 }}>
                                <InfoRow label="Owner" value="Chaiya Phongthun" />
                            </Grid>
                            <Grid size={{ md: 6 }}>
                                <InfoRow label="Group Recruiter" value="Somchai Prasert, Niran Chaiyaporn" />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box>
                        <SectionTitle title="Job Description" />
                        <Typography variant="body2" color="text.secondary" px={4}>
                            ดูแลการออกนโยบายด้านงานพัฒนาความเสี่ยง...
                        </Typography>
                    </Box>

                    <Box>
                        <SectionTitle title="Job Specification" />
                        <Stack>
                            <ul>
                                <li>มีประสบการณ์ในงานสายอาชีพไม่น้อยกว่า 1 ปี</li>
                                <li>มีทักษะการสื่อสาร และเจรจาต่อรอง</li>
                                <li>สามารถประสานงานหลายฝ่ายได้ดี</li>
                                <li>สามารถทำงานเป็นทีม และทำงานภายใต้แรงกดดันได้</li>
                            </ul>
                        </Stack>
                    </Box>

                </Stack>
            </Drawer>

        </>
    );
};

export default ListJobTableView;
