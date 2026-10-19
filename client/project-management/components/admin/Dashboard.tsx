"use client";

import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Collapse,
  CssBaseline,
  Breadcrumbs,
  InputAdornment,
  LinearProgress,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Search,
  Sparkles,
} from "lucide-react";


const theme = createTheme({
  palette: {
    background: { default: "#ffffff" },
    text: { primary: "#0f172a", secondary: "#64748b" },
    divider: "#e5e7eb",
    success: { main: "#16a34a", light: "#dcfce7" },
    error: { main: "#dc2626", light: "#fee2e2" },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 13,
  },
  components: {
    MuiCard: {
      defaultProps: { variant: "outlined" },
      styleOverrides: { root: { borderColor: "#e5e7eb" } },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: "#eef0f3", padding: "6px 12px", fontSize: 12 },
        head: { fontWeight: 600, color: "#0f172a", background: "#fafafa" },
      },
    },
  },
});

/* ----------------------------- Data ------------------------------ */

type Trend = "up" | "down" | "neutral";

interface StatCardData {
  label: string;
  value: string;
  caption: string;
  delta: string;
  trend: Trend;
}

const stats: StatCardData[] = [
  { label: "Users", value: "14k", caption: "Last 30 days", delta: "+25%", trend: "up" },
  { label: "Payments", value: "325", caption: "Last 30 days", delta: "-25%", trend: "down" },
  { label: "Freelancers", value: "200", caption: "Last 30 days", delta: "-5%", trend: "neutral" },
];

interface PageRow {
  title: string;
  status: "Online" | "Offline";
  users: number;
  events: number;
  viewsPerUser: number;
  avgTime: string;
  conversion: number; // 0–100, shown as a progress bar instead of a chart
}

const rows: PageRow[] = [
  { title: "Homepage Overview", status: "Online", users: 212423, events: 8345, viewsPerUser: 18.5, avgTime: "2m 15s", conversion: 90 },
  { title: "Product Details - Gadgets", status: "Online", users: 172240, events: 5653, viewsPerUser: 9.7, avgTime: "2m 30s", conversion: 85 },
  { title: "Checkout Process - Step 1", status: "Offline", users: 58240, events: 3455, viewsPerUser: 15.2, avgTime: "2m 10s", conversion: 70 },
  { title: "User Profile Dashboard", status: "Online", users: 96240, events: 112543, viewsPerUser: 4.5, avgTime: "2m 40s", conversion: 78 },
  { title: "Article Listing - Tech News", status: "Offline", users: 142240, events: 3653, viewsPerUser: 3.1, avgTime: "2m 55s", conversion: 66 },
  { title: "FAQs - Customer Support", status: "Online", users: 15240, events: 106543, viewsPerUser: 7.2, avgTime: "2m 20s", conversion: 60 },
  { title: "Product Comparison - Laptops", status: "Offline", users: 23240, events: 7653, viewsPerUser: 6.5, avgTime: "2m 50s", conversion: 88 },
  { title: "Shopping Cart - Electronics", status: "Online", users: 18240, events: 8563, viewsPerUser: 8.3, avgTime: "3m 10s", conversion: 72 },
  { title: "Payment Confirmation - Bank Tran...", status: "Offline", users: 18240, events: 8563, viewsPerUser: 2.7, avgTime: "2m 35s", conversion: 64 },
  { title: "Product Reviews - Smartphones", status: "Online", users: 29240, events: 9863, viewsPerUser: 3.1, avgTime: "2m 55s", conversion: 80 },
  { title: "Subscription Management - Servi...", status: "Online", users: 24240, events: 6563, viewsPerUser: 4.8, avgTime: "3m 15s", conversion: 58 },
  { title: "Order Tracking - Shipments", status: "Offline", users: 38240, events: 12353, viewsPerUser: 3.5, avgTime: "3m 20s", conversion: 62 },
  { title: "Customer Feedback - Surveys", status: "Online", users: 13240, events: 5863, viewsPerUser: 2.3, avgTime: "3m 30s", conversion: 55 },
  { title: "Account Settings - Preferences", status: "Offline", users: 18240, events: 7653, viewsPerUser: 3.2, avgTime: "3m 15s", conversion: 68 },
  { title: "Login Page - Authentication", status: "Online", users: 28240, events: 8563, viewsPerUser: 3.0, avgTime: "2m 45s", conversion: 76 },
  { title: "Promotions - Seasonal Sales", status: "Online", users: 54230, events: 12423, viewsPerUser: 7.8, avgTime: "2m 40s", conversion: 84 },
  { title: "Tutorials - How-to Guides", status: "Online", users: 19242, events: 6233, viewsPerUser: 5.2, avgTime: "3m 50s", conversion: 74 },
  { title: "Blog Posts - Tech Insights", status: "Online", users: 34234, events: 8567, viewsPerUser: 6.3, avgTime: "3m 30s", conversion: 82 },
  { title: "Events - Webinars", status: "Online", users: 19234, events: 3456, viewsPerUser: 4.5, avgTime: "2m 55s", conversion: 69 },
  { title: "Support - Contact Us", status: "Online", users: 27645, events: 6734, viewsPerUser: 3.9, avgTime: "3m 25s", conversion: 63 },
];

interface TreeNode {
  label: string;
  children?: TreeNode[];
}

const productTree: TreeNode[] = [
  {
    label: "Website",
    children: [
      { label: "Home" },
      { label: "Pricing" },
      { label: "About us" },
      { label: "Blog" },
    ],
  },
  { label: "Store" },
  { label: "Contact" },
  { label: "Help" },
];

const countries = [
  { flag: "🇮🇳", name: "India", value: 50, color: "#64748b" },
  { flag: "🇺🇸", name: "USA", value: 35, color: "#334155" },
  { flag: "🇧🇷", name: "Brazil", value: 10, color: "#0f172a" },
  { flag: "🌐", name: "Other", value: 5, color: "#0ea5e9" },
];

/* --------------------------- Components -------------------------- */

const trendStyles: Record<Trend, { bg: string; fg: string }> = {
  up: { bg: "#dcfce7", fg: "#15803d" },
  down: { bg: "#fee2e2", fg: "#b91c1c" },
  neutral: { bg: "#e2e8f0", fg: "#475569" },
};

function DeltaChip({ value, trend }: { value: string; trend: Trend }) {
  return (
    <Chip
      label={value}
      size="small"
      sx={{
        height: 18,
        fontSize: 10,
        fontWeight: 600,
        bgcolor: trendStyles[trend].bg,
        color: trendStyles[trend].fg,
        "& .MuiChip-label": { px: 0.75 },
      }}
    />
  );
}

function StatCard({ label, value, caption, delta, trend }: StatCardData) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Typography sx={{ fontWeight: 600, fontSize: 12 }}>
          {label}
        </Typography>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mt: 0.5 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>
            {value}
          </Typography>
          <DeltaChip value={delta} trend={trend} />
        </Stack>
        <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
          {caption}
        </Typography>
        {/* Chart area intentionally left out */}
        <Box sx={{ height: 36 }} />
      </CardContent>
    </Card>
  );
}

function InsightsCard() {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Sparkles size={16} />
        <Typography sx={{ fontWeight: 600, fontSize: 12, mt: 0.5 }}>
          Explore your data
        </Typography>
        <Typography sx={{ fontSize: 11, color: "text.secondary", mt: 0.5, mb: 1.25 }}>
          Uncover performance and visitor insights with our data wizardry.
        </Typography>
        <Button
          variant="contained"
          size="small"
          endIcon={<ChevronRight size={14} />}
          sx={{
            textTransform: "none",
            bgcolor: "#0f172a",
            fontSize: 11,
            py: 0.25,
            "&:hover": { bgcolor: "#1e293b" },
          }}
        >
          Get insights
        </Button>
      </CardContent>
    </Card>
  );
}

function ChartPlaceholderCard({
  title,
  value,
  delta,
  caption,
}: {
  title: string;
  value: string;
  delta?: string;
  caption: string;
}) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Typography sx={{ fontWeight: 600, fontSize: 12 }}>
          {title}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 0.5 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>
            {value}
          </Typography>
          {delta && <DeltaChip value={delta} trend="up" />}
        </Stack>
        <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
          {caption}
        </Typography>
        {/* Chart area intentionally left out */}
        <Box sx={{ height: 140 }} />
      </CardContent>
    </Card>
  );
}

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [open, setOpen] = React.useState(depth === 0 && !!node.children);
  const [selected, setSelected] = React.useState(false);
  const hasChildren = !!node.children?.length;

  return (
    <>
      <ListItemButton
        dense
        selected={selected}
        onClick={() => {
          if (hasChildren) setOpen((o) => !o);
          setSelected(true);
        }}
        sx={{ pl: 1 + depth * 2, py: 0.25, borderRadius: 1 }}
      >
        <Box sx={{ width: 16, display: "flex", alignItems: "center" }}>
          {hasChildren ? (
            open ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          ) : (
            <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "success.main", ml: 0.5 }} />
          )}
        </Box>
        <ListItemText
          primary={node.label}
          slotProps={{
            primary: {
              sx: { fontSize: 12, color: !hasChildren ? "success.main" : "text.primary" },
            },
          }}
        />
      </ListItemButton>
      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {node.children!.map((child) => (
              <TreeItem key={child.label} node={child} depth={depth + 1} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

function ProductTree() {
  return (
    <Card>
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Typography sx={{ fontWeight: 600, fontSize: 12, mb: 0.5 }}>
          Product tree
        </Typography>
        <List disablePadding>
          {productTree.map((node) => (
            <TreeItem key={node.label} node={node} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

function UsersByCountry() {
  return (
    <Card>
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Typography sx={{ fontWeight: 600, fontSize: 12 }}>
          Users by country
        </Typography>

        {/* Donut chart removed – total shown as plain text */}
        <Box sx={{ textAlign: "center", py: 2.5 }}>
          <Typography sx={{ fontSize: 22, fontWeight: 700, lineHeight: 1.1 }}>
            98.5K
          </Typography>
          <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
            Total
          </Typography>
        </Box>

        <Stack spacing={1.25}>
          {countries.map((c) => (
            <Box key={c.name}>
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                  <span style={{ fontSize: 14 }}>{c.flag}</span>
                  <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                    {c.name}
                  </Typography>
                </Stack>
                <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                  {c.value}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={c.value}
                sx={{
                  height: 4,
                  borderRadius: 2,
                  bgcolor: "#e2e8f0",
                  "& .MuiLinearProgress-bar": { bgcolor: c.color, borderRadius: 2 },
                }}
              />
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function StatusChip({ status }: { status: PageRow["status"] }) {
  const online = status === "Online";
  return (
    <Chip
      label={status}
      size="small"
      variant="outlined"
      sx={{
        height: 18,
        fontSize: 10,
        fontWeight: 600,
        bgcolor: online ? "#f0fdf4" : "#f8fafc",
        color: online ? "#15803d" : "#475569",
        borderColor: online ? "#bbf7d0" : "#e2e8f0",
        "& .MuiChip-label": { px: 0.75 },
      }}
    />
  );
}

function PagesTable() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const total = rows.length;
  const start = (page - 1) * rowsPerPage;
  const visible = rows.slice(start, start + rowsPerPage);
  const allChecked = visible.length > 0 && visible.every((r) => selected.has(r.title));

  const toggle = (title: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });

  const toggleAll = () =>
    setSelected((prev) => {
      const next = new Set(prev);
      visible.forEach((r) => (allChecked ? next.delete(r.title) : next.add(r.title)));
      return next;
    });

  return (
    <Card>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox size="small" checked={allChecked} onChange={toggleAll} />
              </TableCell>
              <TableCell>Page Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Users</TableCell>
              <TableCell>Event Count</TableCell>
              <TableCell>Views per User</TableCell>
              <TableCell>Average Time</TableCell>
              <TableCell>Daily Conversions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visible.map((r) => (
              <TableRow key={r.title} hover selected={selected.has(r.title)}>
                <TableCell padding="checkbox">
                  <Checkbox size="small" checked={selected.has(r.title)} onChange={() => toggle(r.title)} />
                </TableCell>
                <TableCell>{r.title}</TableCell>
                <TableCell>
                  <StatusChip status={r.status} />
                </TableCell>
                <TableCell>{r.users.toLocaleString()}</TableCell>
                <TableCell>{r.events.toLocaleString()}</TableCell>
                <TableCell>{r.viewsPerUser}</TableCell>
                <TableCell>{r.avgTime}</TableCell>
                <TableCell sx={{ minWidth: 110 }}>
                  <LinearProgress
                    variant="determinate"
                    value={r.conversion}
                    sx={{ height: 6, borderRadius: 1, bgcolor: "#e0f2fe", "& .MuiLinearProgress-bar": { bgcolor: "#0284c7" } }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end", alignItems: "center", p: 1, borderTop: 1, borderColor: "divider" }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
            Rows per page:
          </Typography>
          <Select
            size="small"
            variant="standard"
            disableUnderline
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
            sx={{ fontSize: 11 }}
          >
            {[10, 20, 25].map((n) => (
              <MenuItem key={n} value={n} sx={{ fontSize: 12 }}>
                {n}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
          {start + 1}-{Math.min(start + rowsPerPage, total)} of {total}
        </Typography>
        <Pagination
          size="small"
          count={Math.ceil(total / rowsPerPage)}
          page={page}
          onChange={(_, p) => setPage(p)}
          hideNextButton={false}
          hidePrevButton={false}
          sx={{ "& .MuiPaginationItem-page": { display: "none" } }}
        />
      </Stack>
    </Card>
  );
}

function TopBar() {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
      <Breadcrumbs separator="›" sx={{ fontSize: 11 }}>
        <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
          Dashboard
        </Typography>
        <Typography sx={{ fontSize: 11, fontWeight: 600 }}>
          Home
        </Typography>
      </Breadcrumbs>

    
    </Stack>
  );
}

/* ------------------------------ Page ----------------------------- */

export default function DashboardPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 3 } }}>
        <TopBar />

        {/* Overview */}
        <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 1.25 }}>
          Overview
        </Typography>

        <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
          {stats.map((s) => (
            <Grid key={s.label} size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard {...s} />
            </Grid>
          ))}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <InsightsCard />
          </Grid>
        </Grid>

        <Grid container spacing={1.5} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ChartPlaceholderCard
              title="Sessions"
              value="13,277"
              delta="+35%"
              caption="Sessions per day for the last 30 days"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ChartPlaceholderCard
              title="Page views and downloads"
              value="1.3M"
              caption="Page views and downloads for the last 6 months"
            />
          </Grid>
        </Grid>

        {/* Details */}
        <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 1.25 }}>
          Details
        </Typography>

        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, lg: 9 }}>
            <PagesTable />
          </Grid>
          <Grid size={{ xs: 12, lg: 3 }}>
            <Stack spacing={1.5}>
              <ProductTree />
              <UsersByCountry />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}