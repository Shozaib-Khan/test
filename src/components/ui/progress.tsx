"use client";

import * as React from "react";

import { LinearProgress, useTheme } from "@mui/material";

const Progress = React.forwardRef(
  ({ value, className }: { value?: number; className?: string }, ref) => {
    const theme = useTheme();
    return (
      <LinearProgress
        className={className}
        ref={ref}
        variant="determinate"
        value={value || 0}
        sx={{ height: theme.spacing(1) }}
      />
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
