"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useState } from "react";
import api from "@/lib/axios";
import { Button } from "@/untitledui/base/buttons/button";

interface SingleEmployeeType {
  full_name: string;
  username: string;
  email: string;
  role: string;
  status: string;
  isFullTime: boolean;
  createdAt: string;
}

export default function EmployeeShow() {
  const { employeeId } = useParams<{ employeeId: string }>();
  const router = useRouter()
  const [singleDataOfModerator, setSingleDataOfModerator] = useState<SingleEmployeeType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchModerators = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<{ data: SingleEmployeeType }>(
          `/auth/api/v1/auth/admin/moderators/${employeeId}`,
        );
        if (!response.data.data) {
          throw new Error("Employee details were not returned by the server.");
        }
        setSingleDataOfModerator(response.data.data);
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load employee details.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchModerators();
  }, [employeeId]);

  if (loading) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          m: 1,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !singleDataOfModerator) {
    return (
      <Alert severity="error">
        {error ?? "Employee details are not available."}
      </Alert>
    );
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, width: "100%",marginTop:"30px" }}>
        <Grid container spacing={2} sx={{ width: "100%" }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Fullname</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {singleDataOfModerator.full_name}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">username</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {singleDataOfModerator.username}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Email</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {singleDataOfModerator.email}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{xs:12,sm:6}}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Status</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {singleDataOfModerator.status}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Join date</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {dayjs(singleDataOfModerator.createdAt).format("MMMM D, YYYY")}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Role</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {singleDataOfModerator.role}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Full-time</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {singleDataOfModerator.isFullTime ? "Yes" : "No"}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Button
            iconLeading={<ArrowLeft size={18} />}
            className='bg-purple-500' size="lg"
            onClick={()=>router.push('/admin/employees')}
          >
            Back
          </Button>
          <Stack direction="row" spacing={2}>
            <Button
            className='bg-purple-500' size="lg"
              iconLeading={<Pencil size={18} />}
            >
              Edit
            </Button>
            <Button
              iconLeading={<Trash2 size={18} />}
              className='bg-red-500' size='lg'
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
