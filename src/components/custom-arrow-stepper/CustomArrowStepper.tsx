import { Stack, Typography } from '@mui/material';
import {
  StyledStepperButtonBase,
  StyledStepperContainer,
  StyledStepperItemContainer,
} from './styles';

// ----------------------------------------------------------------------

type CustomArrowStepperProps = {
  steps: TStep[];
  activeStep: string;
  onChangeStep: (id: string) => void;
};

type TStep = {
  id: string;
  label: string;
  count: number;
};

const CustomArrowStepper = ({ steps, activeStep, onChangeStep }: CustomArrowStepperProps) => {
  return (
    <StyledStepperContainer>
      {steps.map((step, index) => {
        const isActive = step.id === activeStep;

        return (
          <StyledStepperItemContainer key={step.id}>
            <StyledStepperButtonBase
              index={index}
              isActive={isActive}
              onClick={() => onChangeStep(step.id)}
            >
              <Stack direction="column" sx={{ width: '100%', alignItems: 'flex-start' }}>
                <Typography variant="h4">{step.count}</Typography>
                <Typography
                  whiteSpace="pre-wrap"
                  variant={isActive ? 'subtitle1_semibold' : 'subtitle1_medium'}
                >
                  {step.label}
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
