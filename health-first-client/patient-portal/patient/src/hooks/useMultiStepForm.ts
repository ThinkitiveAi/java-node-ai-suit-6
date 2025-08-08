import { useState, useCallback } from 'react';

interface FormStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  fields: string[];
}

interface UseMultiStepFormProps {
  steps: FormStep[];
  onStepChange?: (stepIndex: number) => void;
}

export const useMultiStepForm = ({ steps, onStepChange }: UseMultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set<number>());
  const [visitedSteps, setVisitedSteps] = useState(new Set([0]));

  // Navigate to next step
  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setVisitedSteps(prev => new Set([...prev, nextStepIndex]));
      onStepChange?.(nextStepIndex);
    }
  }, [currentStep, steps.length, onStepChange]);

  // Navigate to previous step
  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1;
      setCurrentStep(prevStepIndex);
      onStepChange?.(prevStepIndex);
    }
  }, [currentStep, onStepChange]);

  // Navigate to specific step
  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
      setVisitedSteps(prev => new Set([...prev, stepIndex]));
      onStepChange?.(stepIndex);
    }
  }, [steps.length, onStepChange]);

  // Mark step as completed
  const markStepAsCompleted = useCallback((stepIndex: number) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
  }, []);

  // Check if step is completed
  const isStepCompleted = useCallback((stepIndex: number): boolean => {
    return completedSteps.has(stepIndex);
  }, [completedSteps]);

  // Check if step is visited
  const isStepVisited = useCallback((stepIndex: number): boolean => {
    return visitedSteps.has(stepIndex);
  }, [visitedSteps]);

  // Check if step is accessible (can be navigated to)
  const isStepAccessible = useCallback((stepIndex: number): boolean => {
    // Can always go to previous steps or current step
    if (stepIndex <= currentStep) return true;
    
    // Can go to next step if current step is completed
    if (stepIndex === currentStep + 1) {
      return completedSteps.has(currentStep);
    }
    
    // Can go to any step that has been visited
    return visitedSteps.has(stepIndex);
  }, [currentStep, completedSteps, visitedSteps]);

  // Get current step info
  const getCurrentStep = useCallback((): FormStep => {
    return steps[currentStep];
  }, [steps, currentStep]);

  // Get step by index
  const getStep = useCallback((stepIndex: number): FormStep | null => {
    return steps[stepIndex] || null;
  }, [steps]);

  // Check if current step is the first step
  const isFirstStep = currentStep === 0;

  // Check if current step is the last step
  const isLastStep = currentStep === steps.length - 1;

  // Get step completion percentage
  const getStepCompletionPercentage = useCallback((): number => {
    const completedCount = completedSteps.size;
    const currentStepWeight = currentStep < steps.length ? 1 : 0;
    const totalWeight = steps.length + currentStepWeight;
    
    return Math.round(((completedCount + currentStepWeight) / totalWeight) * 100);
  }, [completedSteps, currentStep, steps.length]);

  // Get step progress info
  const getStepProgress = useCallback(() => {
    return {
      currentStep,
      totalSteps: steps.length,
      completedSteps: Array.from(completedSteps),
      visitedSteps: Array.from(visitedSteps),
      completionPercentage: getStepCompletionPercentage(),
      isFirstStep,
      isLastStep,
    };
  }, [currentStep, steps.length, completedSteps, visitedSteps, getStepCompletionPercentage, isFirstStep, isLastStep]);

  // Reset form to first step
  const resetToFirstStep = useCallback(() => {
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setVisitedSteps(new Set([0]));
    onStepChange?.(0);
  }, [onStepChange]);

  // Jump to step if accessible
  const jumpToStep = useCallback((stepIndex: number) => {
    if (isStepAccessible(stepIndex)) {
      goToStep(stepIndex);
    }
  }, [isStepAccessible, goToStep]);

  return {
    // State
    currentStep,
    completedSteps,
    visitedSteps,
    
    // Navigation
    nextStep,
    prevStep,
    goToStep,
    jumpToStep,
    
    // Step management
    markStepAsCompleted,
    isStepCompleted,
    isStepVisited,
    isStepAccessible,
    
    // Step info
    getCurrentStep,
    getStep,
    getStepProgress,
    
    // Computed values
    isFirstStep,
    isLastStep,
    getStepCompletionPercentage,
    
    // Reset
    resetToFirstStep,
  };
}; 