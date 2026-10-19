'use client';

import type { FormEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import type { EmployeeValues } from './data/employees';

export type FormFieldValue = string | number | boolean;

export interface EmployeeFormState {
  values: Partial<EmployeeValues>;
  errors: Partial<Record<keyof EmployeeValues, string | undefined>>;
}

interface EmployeeFormProps {
  formState: EmployeeFormState;
  onFieldChange: (name: keyof EmployeeValues, value: FormFieldValue) => void;
  onSubmit: () => Promise<void>;
  onReset: () => void;
  submitButtonLabel: string;
  backButtonPath?: string;
}

export default function EmployeeForm({
  formState,
  onFieldChange,
  onSubmit,
  onReset,
  submitButtonLabel,
  backButtonPath,
}: EmployeeFormProps) {
  const values = formState.values;
  const errors = formState.errors;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void onSubmit();
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 640, width: '100%' }}>
      <Stack spacing={2}>
        <TextField
          label="Name"
          value={values.name ?? ''}
          error={Boolean(errors.name)}
          helperText={errors.name}
          onChange={(event) => onFieldChange('name', event.target.value)}
          required
        />
        <TextField
          label="Age"
          type="number"
          value={values.age ?? ''}
          error={Boolean(errors.age)}
          helperText={errors.age}
          onChange={(event) => onFieldChange('age', Number(event.target.value))}
          slotProps={{htmlInput:{min:18}}}
          required
        />
        <TextField
          type="date"
          value={values.joinDate ?? ''}
          error={Boolean(errors.joinDate)}
          helperText={errors.joinDate}
          onChange={(event) => onFieldChange('joinDate', event.target.value)}
          required
        />
        <FormControl error={Boolean(errors.role)} required>
          <InputLabel id="employee-role-label">Department</InputLabel>
          <Select
            labelId="employee-role-label"
            label="Department"
            value={values.role ?? ''}
            onChange={(event) => onFieldChange('role', event.target.value)}
          >
            <MenuItem value="Market">Market</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Development">Development</MenuItem>
          </Select>
          {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
        </FormControl>
        <FormControl error={Boolean(errors.isFullTime)}>
          <FormControlLabel
            control={
              <Switch
                checked={values.isFullTime ?? false}
                onChange={(event) => onFieldChange('isFullTime', event.target.checked)}
              />
            }
            label="Full-time"
          />
          {errors.isFullTime && <FormHelperText>{errors.isFullTime}</FormHelperText>}
        </FormControl>
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained">
            {submitButtonLabel}
          </Button>
          <Button type="button" onClick={onReset}>
            Reset
          </Button>
          {backButtonPath && (
            <Button component="a" href={backButtonPath}>
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
