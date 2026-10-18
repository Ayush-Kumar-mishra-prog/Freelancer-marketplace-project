"use client";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Menu, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HomePageNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        color: "#0f172a",
        bgcolor: "rgba(255,255,255,.94)",
        borderBottom: "1px solid #e2e8f0",
        backdropFilter: "blur(12px)",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          maxWidth: 1240,
          mx: "auto",
          minHeight: { xs: 64, sm: 72 },
          gap: { xs: 1, sm: 2 },
          px: { xs: 2, md: 4 },
        }}
      >
        <IconButton
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
          sx={{ display: { xs: "inline-flex", md: "none" }, color: "#334155" }}
        >
          <Menu size={21} />
        </IconButton>
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 no-underline"
          aria-label="GigSphere home"
        >
          <Avatar
            variant="rounded"
            sx={{
              width: 35,
              height: 35,
              borderRadius: 2.5,
              bgcolor: "#2563eb",
              color: "white",
            }}
          >
            <Sparkles size={19} />
          </Avatar>
          <Typography
            component="span"
            sx={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.04em", color: "#0f172a" }}
          >
            Gig<span style={{ color: "#2563eb" }}>Sphere</span>
          </Typography>
        </Link>

        <Box
          component="nav"
          aria-label="Main navigation"
          sx={{
            display: { xs: menuOpen ? "flex" : "none", md: "flex" },
            position: { xs: "absolute", md: "static" },
            top: { xs: 64, md: "auto" },
            left: { xs: 0, md: "auto" },
            right: { xs: 0, md: "auto" },
            p: { xs: 2, md: 0 },
            bgcolor: { xs: "white", md: "transparent" },
            borderBottom: { xs: "1px solid #e2e8f0", md: 0 },
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
            gap: { xs: 1.5, md: 3 },
            ml: { md: 5 },
            zIndex: 2,
          }}
        >
          <Link className="text-sm font-medium text-slate-600 no-underline hover:text-blue-700" href="/#projects">
            Explore projects
          </Link>
          <Link className="text-sm font-medium text-slate-600 no-underline hover:text-blue-700" href="/#freelancers">
            Freelancers
          </Link>
          <Link className="text-sm font-medium text-slate-600 no-underline hover:text-blue-700" href="/#premium">
            Premium
          </Link>
        </Box>

        <Box sx={{ flex: 1 }} />
        <Button
          aria-label="Search projects"
          href="/#projects"
          sx={{ minWidth: 40, color: "#475569", display: { xs: "none", sm: "inline-flex" } }}
        >
          <Search size={19} />
        </Button>
        <Button
          component={Link}
          href="/auth"
          sx={{ color: "#334155", fontWeight: 650, textTransform: "none", display: { xs: "none", sm: "inline-flex" } }}
        >
          Log in
        </Button>
        <Button
          component={Link}
          href="/auth?mode=signup"
          variant="contained"
          sx={{ px: 2, py: 1, borderRadius: 2.5, bgcolor: "#2563eb", boxShadow: "none", textTransform: "none", "&:hover": { bgcolor: "#1d4ed8", boxShadow: "none" } }}
        >
          Join GigSphere
        </Button>
      </Toolbar>
    </AppBar>
  );
}
