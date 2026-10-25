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
import { deepPurple } from '@mui/material/colors';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Edit2, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { useDialogs } from '@/hooks/useDialogs/useDialogs';
import useNotifications from '@/hooks/useNotifications/useNotification';
import PageContainer from './PageContainer';
import api from '@/lib/axios';

const INITIAL_PAGE_SIZE = 10;

interface Moderator {
  _id: string;
  full_name: string;
  username: string;
  email: string;
  role: string;
  status: string;
  isFullTime: boolean;
}

interface ModeratorListResponse {
  data: Moderator[];
  itemCount: number;
}

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
  const [dataOfModerator, setDataOfModerator] = React.useState<Moderator[]>([]);
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
      const response = await api.get<ModeratorListResponse>(
        '/auth/api/v1/auth/admin/allModeraotor',
        { params: { page, pageSize, search } },
      );
      if (!Array.isArray(response.data.data)) {
        throw new Error('The moderator list response is invalid.');
      }
      setDataOfModerator(response.data.data);
      setRowCount(response.data.itemCount);
    } catch (loadError) {
      setDataOfModerator([]);
      setRowCount(0);
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

  const handleDelete = async (employee: Moderator) => {
    const confirmed = await dialogs.confirm(`Do you wish to delete ${employee.full_name}?`);
    if (!confirmed) {
      return;
    }
    try {
      await api.delete('/auth/api/v1/auth/admin/deleteModerator', {
        data: { id: employee._id },
      });
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
                      <TableCell>Fullname</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>status</TableCell>
                      <TableCell>Full-time</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataOfModerator.map((employee) => (
                      <TableRow key={employee._id} hover>
                        <TableCell><Avatar sx={{ bgcolor: deepPurple[500] }}>
                          {employee.full_name.charAt(0).toUpperCase()}
                          </Avatar></TableCell>
                        <TableCell>
                          <Button
                            onClick={() =>
                              router.push(`/admin/employees/${employee._id}`)
                            }
                          >
                            {employee.full_name}
                          </Button>
                        </TableCell>
                        <TableCell>{employee.username}</TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>{employee.status}</TableCell>
                        <TableCell>{employee.isFullTime ? 'Yes' : 'No'}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            aria-label={`Edit ${employee.username}`}
                            onClick={() =>
                              router.push(`/admin/employees/${employee._id}/edit`)
                            }
                          >
                            <Edit2 size={18} />
                          </IconButton>
                          <IconButton
                            aria-label={`Delete ${employee.username}`}
                            color="error"
                            onClick={() => void handleDelete(employee)}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {dataOfModerator.length === 0 && (
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
