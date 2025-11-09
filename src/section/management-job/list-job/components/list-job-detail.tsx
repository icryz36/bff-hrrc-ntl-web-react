import Drawer, {drawerClasses} from "@mui/material/Drawer";
import {Box, Checkbox, Chip, FormControlLabel, Grid, Stack, Typography} from "@mui/material";
import IconifyIcon from "components/base/IconifyIcon.tsx";
import {FC} from "react";

interface IListJobDetailComponentProps {
    open: boolean;
}

const  ListJobDetailComponent: FC<IListJobDetailComponentProps> = (props) => {

    const { open } = props

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
        <Drawer
            anchor="bottom"
            open={open}
            sx={{
                [`& .${drawerClasses.paper}`]: {
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    height: '100vh',
                },
            }}
        >
            <IconifyIcon
                icon="material-symbols-light:close-rounded"
                fontSize="32px"
                color="#111417"
                sx={{ position: 'absolute', top: 20, right: 20, cursor: 'pointer' }}
                // onClick={isOpenDetailDialog.onFalse}
            />
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
    )
}

export  default ListJobDetailComponent;