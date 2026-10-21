"use client";
import * as React from "react";
import { Button } from "@/untitledui/base/buttons/button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface PropsType {
  heading: String;
  text: String;
  value: boolean;
  onClose: any;
}

export default function DialogBox({
  heading,
  text,
  value,
  onClose,
}: PropsType) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={value}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{heading}</DialogTitle>

        <DialogContent>
          <DialogContentText id="responsive-dialog-title">
            Name: {"GullChande"}
          </DialogContentText>
          <DialogContentText id="responsive-dialog-title">
            Id:{"1"}
          </DialogContentText>
          <DialogContentText id="responsive-dialog-title">
            Date:{"20-22-290"}
          </DialogContentText>
          <DialogContentText id="responsive-dialog-title">
            Freelancer Name:{"manohar"}
          </DialogContentText>
          <DialogContentText id="responsive-dialog-title">
            Freelancer Email:{"free@gamil.com"}
          </DialogContentText>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="bg-red-600" onClick={onClose}>
            Block the freelancer
          </Button>
          <Button className="bg-purple-700" onClick={onClose}>
            Open this project
          </Button>
          <Button className="bg-amber-400" onClick={onClose}>
            Send warning
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
