import { Stack, Typography } from '@mui/material';
import { TStageSummary } from 'types/job-application';
import {
  StyledStepperButtonBase,
  StyledStepperContainer,
  StyledStepperItemContainer,
} from './styles';

// ----------------------------------------------------------------------

type CustomArrowStepperProps = {
  steps: TStageSummary[];
  activeStep: string;
  onChangeStep: (id: string) => void;
};

const CustomArrowStepper = ({ steps, activeStep, onChangeStep }: CustomArrowStepperProps) => {
  return (
    <StyledStepperContainer>
      {steps.map((step, index) => {
        const isActive = step.stageId === activeStep;

        return (
          <StyledStepperItemContainer key={step.stageId}>
            <StyledStepperButtonBase
              index={index}
              isActive={isActive}
              onClick={() => onChangeStep(step.stageId)}
            >
              <Stack direction="column" sx={{ width: '100%', alignItems: 'flex-start' }}>
                <Typography variant="h4">{step.jobApplicationCount}</Typography>
                <Typography
                  whiteSpace="pre-wrap"
                  variant={isActive ? 'subtitle1_semibold' : 'subtitle1_medium'}
                >
                  {step.stageNameEn}
                </Typography>
              </Stack>
            </StyledStepperButtonBase>
          </StyledStepperItemContainer>
        );
      })}
    </StyledStepperContainer>
  );
};

export default CustomArrowStepper;
