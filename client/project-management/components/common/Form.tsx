
"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Dayjs } from "dayjs";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import  { SelectChangeEvent } from '@mui/material/Select';

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type SubmittedData = {
  name: string;
  email: string;
  date: string;
  imageName: string;
  imagePreview: string;
};

export default function FormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
    const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] =
    useState<SubmittedData | null>(null);

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(file);
        setPreview(reader.result);
        setError("");
        setSubmitted(null);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!date) {
      setError("Please select a date.");
      return;
    }

    if (!image || !preview) {
      setError("Please upload an image.");
      return;
    }

    setError("");

    setSubmitted({
      name,
      email,
      date: date.format("DD MMM YYYY"),
      imageName: image.name,
      imagePreview: preview,
    });
  };



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className=''
        
      >
        <div className='max-w-4xl' >
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #e3e8f0",
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              

              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Enter your Project or post details
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  <TextField
                    label="Title of the post"
                    placeholder="Enter your Title of the post"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    fullWidth
                    required
                  />

                    <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Category of post"
    onChange={handleChange}
  >
    <MenuItem value="Active">Web application</MenuItem>
    <MenuItem value="Suspended">Graphics design</MenuItem>
    <MenuItem value="Suspended">Digital marketing</MenuItem>
  </Select>
</FormControl>

                  <TextField
                    label="Sort discription about post"
                    type="email"
                    placeholder="Sort discription about post"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    fullWidth
                    required
                  />

                  <TextField
                    label="Cost for the project"
                    type="number"
                    placeholder="Cost for the project"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    fullWidth
                    required
                  />

                  <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Status</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Status"
    onChange={handleChange}
  >
    <MenuItem value="Active">Active</MenuItem>
    <MenuItem value="Suspended">Suspended</MenuItem>
  </Select>
</FormControl>

                  <DatePicker
                    label="Select Date"
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
                    maxDate={undefined}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                      },
                    }}
                  />

                  <Box>
                    

                    <Button
                      component="label"
                      variant="outlined"
                      fullWidth
                      sx={{
                        py: 1.5,
                        textTransform: "none",
                        borderStyle: "dashed",
                      }}
                    >
                      Choose Image
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Button>

                    
                  </Box>

                  {preview && (
                    <Box>
                      

                      <Box
                        component="img"
                        src={preview}
                        alt="Uploaded image preview"
                        sx={{
                          display: "block",
                          width: "100%",
                          maxHeight: 260,
                          objectFit: "contain",
                          bgcolor: "#f8fafc",
                          border: "1px solid #e0e0e0",
                          borderRadius: 2,
                        }}
                      />

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1, overflowWrap: "anywhere" }}
                      >
                        {image?.name}
                      </Typography>
                    </Box>
                  )}

                  {error && <Alert severity="error">{error}</Alert>}

                  
                </Stack>
              </Box>

             
            </CardContent>
          </Card>
        </div>
      </div>
    </LocalizationProvider>
  );
}
