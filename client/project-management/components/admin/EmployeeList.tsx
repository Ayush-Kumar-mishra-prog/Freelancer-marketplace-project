'use client';

import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import {Avatar, Stack} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Edit2, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { useDialogs } from '@/hooks/useDialogs/useDialogs';
import useNotifications from '@/hooks/useNotifications/useNotification';
import {
  deleteOne as deleteEmployee,
  getMany as getEmployees,
  type Employee,
} from './data/employees';
import PageContainer from './PageContainer';
import {dummyEmployeeData} from './data/dummyEmployee'

const INITIAL_PAGE_SIZE = 10;

export default function EmployeeList() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dialogs = useDialogs();
  const notifications = useNotifications();
  const page = Math.max(0, Number(searchParams.get('page') ?? 0));
  const pageSize = Math.max(1, Number(searchParams.get('pageSize') ?? INITIAL_PAGE_SIZE));
  const search = searchParams.get('search') ?? '';
  const [searchValue, setSearchValue] = React.useState(search);
  const [dummyData,setDummyData] = React.useState(dummyEmployeeData)

  const [rows, setRows] = React.useState<Employee[]>([]);
  const [rowCount, setRowCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  const updateQuery = React.useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router, searchParams],
  );

  const loadData = React.useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const listData = await getEmployees({ page, pageSize, search });
      setRows(listData.items);
      setRowCount(listData.itemCount);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError : new Error(String(loadError)));
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, search]);

  React.useEffect(() => {
    setSearchValue(search);
    void loadData();
  }, [loadData, search]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateQuery({ search: searchValue.trim() || null, page: null });
  };

  const handleDelete = async (employee: Employee) => {
    const confirmed = await dialogs.confirm(`Do you wish to delete ${employee.name}?`);
    if (!confirmed) {
      return;
    }
    try {
      await deleteEmployee(employee.id);
      notifications.show('Employee deleted successfully.', {
        severity: 'success',
        autoHideDuration: 3000,
      });
      await loadData();
    } catch (deleteError) {
      notifications.show(
        `Failed to delete employee. Reason: ${
          deleteError instanceof Error ? deleteError.message : String(deleteError)
        }`,
        { severity: 'error', autoHideDuration: 3000 },
      );
    }
  };

  return (
    <PageContainer
      title="Employees"
      breadcrumbs={[{ title: 'Employees' }]}
      actions={
        <Stack direction="row" spacing={1}>
          <Tooltip title="Reload data">
            <span>
              <IconButton
                size="small"
                aria-label="Refresh employees"
                onClick={() => void loadData()}
                disabled={isLoading}
              >
                <RefreshCw size={18} />
              </IconButton>
            </span>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            onClick={() => router.push('/admin/employees/new')}
          >
            Create
          </Button>
        </Stack>
      }
    >
      <Stack component="form" direction="row" spacing={1} onSubmit={handleSearch}>
        <TextField
          size="small"
          label="Search employees"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <Button type="submit" variant="outlined">
          Search
        </Button>
        <Select
          size="small"
          value={pageSize}
          aria-label="Rows per page"
          onChange={(event) =>
            updateQuery({ pageSize: String(event.target.value), page: null })
          }
        >
          {[10, 25, 50].map((size) => (
            <MenuItem key={size} value={size}>
              {size} rows
            </MenuItem>
          ))}
        </Select>
      </Stack>

      {error ? (
        <Alert severity="error">{error.message}</Alert>
      ) : (
        <Box sx={{ width: '100%' }}>
          {isLoading ? (
            <Box sx={{ display: 'grid', minHeight: 180, placeItems: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Avatar</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>Join date</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Full-time</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dummyData.map((employee) => (
                      <TableRow key={employee.id} hover>
                        <TableCell><Avatar sx={{ bgcolor: deepPurple[500] }}>
                          {employee.name.charAt(0).toUpperCase()}
                          </Avatar></TableCell>
                        <TableCell>
                          <Button
                            onClick={() =>
                              router.push(`/admin/employees/${employee.id}`)
                            }
                          >
                            {employee.name}
                          </Button>
                        </TableCell>
                        <TableCell>{employee.age}</TableCell>
                        <TableCell>{employee.joinDate}</TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>{employee.isFullTime ? 'Yes' : 'No'}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            aria-label={`Edit ${employee.name}`}
                            onClick={() =>
                              router.push(`/admin/employees/${employee.id}/edit`)
                            }
                          >
                            <Edit2 size={18} />
                          </IconButton>
                          <IconButton
                            aria-label={`Delete ${employee.name}`}
                            color="error"
                            onClick={() => void handleDelete(employee)}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {rows.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No employees found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack direction="row" sx={{ mt: 2,justifyContent:"flex-end" }}>
                <Pagination
                  page={page + 1}
                  count={Math.max(1, Math.ceil(rowCount / pageSize))}
                  onChange={(_, nextPage) =>
                    updateQuery({ page: nextPage === 1 ? null : String(nextPage - 1) })
                  }
                />
              </Stack>
            </>
          )}
        </Box>
      )}
    </PageContainer>
  );
}
