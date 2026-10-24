"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/untitledui/base/buttons/button";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Menu, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions 
} from '@mui/material';

export default function HomePageNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDashboard,setShowDashboard] = useState("")
  const [loggedUser,setLoggedUser] = useState(false)
  const [open, setOpen] = useState(false);
  const {user, logout} = useAuth()
  const router = useRouter()

   const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose =async (confirmed:boolean) => {
    setOpen(false);
    if (confirmed) {
      try {
      await logout()
      router.push("/")
      toast.success("Logout successful")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Logout failed")
    }
    } else {
      console.log("Action cancelled.");
    }
  };

  const handleLogout = async () => {
    handleClickOpen()

  }

  useEffect(()=>{
    if(user){
      const role = user.role;
      console.log(role)
      setLoggedUser(true)
      setShowDashboard(role)
    }
    else{
      setLoggedUser(false)
      setShowDashboard("")
    }
  },[user])

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

        {
          showDashboard ==="client" && (
            <Button onClick={()=>router.push('/client/dashboard')} className='bg-purple-600' size="md">Dashboard</Button>
          )
        }
        {
          showDashboard ==="freelancer" && (
            <Button onClick={()=>router.push('/freelancer/dashboard')} className='bg-purple-600' size="md">Dashboard</Button>
          )
        }
        {
          showDashboard ==="moderator" && (
            <Button onClick={()=>router.push('/moderator/dashboard')} className='bg-purple-600' size="md">Dashboard</Button>
          )
        }
        {
          showDashboard ==="admin" && (
            <Button onClick={()=>router.push('/admin/dashboard')} className='bg-purple-600' size="md">Dashboard</Button>
          )
        }

        {
          user ? <Button onClick={()=>handleLogout()} className='bg-red-600' size="md">Logout</Button>:<Button onClick={()=>router.push('/auth')} className='bg-lime-500' size="md">Get Started</Button>
        }


           <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">
          {"Confirm Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to Logout from this account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} className='bg-red-500'>
            Cancel
          </Button>
          <Button onClick={() => handleClose(true)} className='bg-green-500'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
        
       
        
      </Toolbar>
    </AppBar>
  );
}
