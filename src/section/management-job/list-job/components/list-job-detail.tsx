import Drawer, {drawerClasses} from "@mui/material/Drawer";
import {Box, Checkbox, Chip, FormControlLabel, Grid, Stack, Typography} from "@mui/material";
import IconifyIcon from "components/base/IconifyIcon.tsx";
import {FC} from "react";

interface IListJobDetailComponentProps {
    open: boolean;
    onClose: () => void;
}

const  ListJobDetailComponent: FC<IListJobDetailComponentProps> = ({ open, onClose }) => {

    const InfoRow = ({ label, value, gap = 1 }: { label: string; value: React.ReactNode, gap?: number }) => (
        <Stack direction="row" gap={gap}>
            <Typography variant="subtitle2" color="text.primary"  sx={{ whiteSpace: "pre-line" }} fontWeight={700}>{label} : </Typography>
            <Typography variant="subtitle2" color="text.secondary"  sx={{ whiteSpace: "pre-line" }}>{value}</Typography>
        </Stack>
    );

    const SectionTitle = ({ title }: { title: string }) => (
        <Typography variant="subtitle1" fontWeight={700}>
            {title}
        </Typography>
    );

    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
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
                onClick={onClose}
            />
            <Stack
                sx={{
                    height: '100%',
                    width: '820px',
                    margin: 'auto',
                    py: 6,
                    position: 'relative',
                }}
                spacing={3}
                direction="column"
            >

                <Typography variant="h5" fontWeight={700} color="text.primary">
                    Job Post Detail : H00001
                </Typography>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1" fontWeight={700} color="text.primary">
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

                <Stack px={3} py={2} bgcolor={'#F7FAFC'} spacing={2} direction="column">
                    <SectionTitle title="Position" />
                    <Grid container spacing={2}>
                        <Grid size={{ md: 4 }}>
                            <InfoRow label={`Position No.\nFrom HRMS`} value="N000001" gap={4} />
                        </Grid>
                        <Grid size={{ md: 4 }}>
                            <InfoRow label={`Rationale of\nVacancy`} value="Replacement" gap={4} />
                        </Grid>
                        <Grid size={{ md: 4 }}>
                            <InfoRow label={`Source of\nRecruitment`} value="Internal Only" gap={4} />
                        </Grid>
                    </Grid>
                </Stack>

                <Stack px={3} py={2} bgcolor={'#F7FAFC'} spacing={2} direction="column">
                    <SectionTitle title="Work Location" />
                    <Grid container spacing={2}>
                        <Grid size={{ md: 6 }}>
                            <InfoRow label="Province" value="Province" />
                        </Grid>
                        <Grid size={{ md: 6 }}>
                            <InfoRow label="District" value="District01, District02" />
                        </Grid>
                    </Grid>
                </Stack>

                <Stack px={3} py={2} bgcolor={'#F7FAFC'} spacing={2} direction="column">
                    <SectionTitle title="Department" />
                    <Grid container spacing={2}>
                        <Grid size={{ md: 6 }}>
                            <InfoRow label="Department" value="เงินติดล้อ" />
                        </Grid>
                        <Grid size={{ md: 6 }}>
                            <InfoRow label="Section" value="เงินติดล้อ" />
                        </Grid>
                    </Grid>
                </Stack>

                <Stack px={3} py={2} bgcolor={'#F7FAFC'} spacing={2} direction="column">
                    <SectionTitle title="Type of Employee" />
                    <Grid container spacing={2}>
                        <Grid size={{ md: 4 }}>
                            <InfoRow label="Job Level" value="Officer/Branch Staff 1" />
                        </Grid>
                        <Grid size={{ md: 4 }}>
                            <InfoRow label="Degree" value="ปริญญาตรี" />
                        </Grid>
                        <Grid size={{ md: 4 }}>
                            <InfoRow label="Employee Type" value="งานประจำ" />
                        </Grid>
                    </Grid>
                </Stack>

                <Stack px={3} py={2} spacing={2} direction="column">
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
                </Stack>

                <Stack pt={2} spacing={2} direction="column">
                    <SectionTitle title="Job Description" />
                    <Typography variant="subtitle2" color="text.secondary" px={4}>
                        ดูแลการออกนโยบายด้านงานพัฒนาความเสี่ยง...
                    </Typography>
                </Stack>

                <Stack pt={2} spacing={2} direction="column">
                    <SectionTitle title="Job Specification" />
                    <Stack>
                        <ul>
                            <li>
                                <Typography variant="subtitle2" color="text.secondary">มีประสบการณ์ในงานสายอาชีพไม่น้อยกว่า 1 ปี</Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle2" color="text.secondary">มีทักษะการสื่อสาร และเจรจาต่อรอง</Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle2" color="text.secondary">สามารถประสานงานหลายฝ่ายได้ดี</Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle2" color="text.secondary">สามารถทำงานเป็นทีม และทำงานภายใต้แรงกดดันได้</Typography>
                            </li>
                        </ul>
                    </Stack>
                </Stack>
                <Stack pt={2} pb={6} spacing={2} direction="column">
                    <SectionTitle title="Benefit" />
                    <Typography variant="subtitle2" color="text.secondary" px={4}>
                        -
                    </Typography>
                </Stack>
            </Stack>
        </Drawer>
    )
}

export  default ListJobDetailComponent;