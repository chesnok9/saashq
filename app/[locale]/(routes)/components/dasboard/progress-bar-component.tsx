'use client';
import React from 'react';
import type { ProgressBarProps } from '@tremor/react';
import { ProgressBar } from '@tremor/react';

interface ProgressBarComponentProps extends ProgressBarProps {}

const ProgressBarComponent = (props: ProgressBarComponentProps) => (
  <ProgressBar {...props} />
);

export default ProgressBarComponent;
