"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { SortDescriptor } from "react-aria-components";
import { Table, TableCard } from "@/untitledui/application/table/table";
import { BadgeWithDot } from "@/untitledui/base/badges/badges";
import { Button } from "@/untitledui/base/buttons/button";
import {
  Avatar as MuiAvatar,
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import RichTextEditor from "../textEditor/RichTextEditor";
import { Controller, useForm } from "react-hook-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { Edit2Icon,Trash2Icon } from "lucide-react";

interface ProjectFormData {
  freelancer: string;
  project_name: string;
  project_description: string;
  status: "active" | "block";
  price: number;
  short_Discription: string;
  category: string;
  date: string;
}

interface ProjectRecord {
  _id: string;
  freelancer: string;
  project_name: string;
  project_description: string;
  status: "active" | "block";
  price: number;
  short_Discription?: string;
  category: string;
  date: string;
}

interface ProjectsResponse {
  projects: ProjectRecord[];
}

interface ProjectResponse {
  project: ProjectRecord;
}

export const FreelancerProjectPage = () => {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "status",
    direction: "ascending",
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    defaultValues: {
      project_description: "",
      status: "active",
    },
  });
  const [show, setShow] = useState(false);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [imageError, setImageError] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const formData = new FormData();
      formData.append("freelancer", data.freelancer);
      formData.append("project_name", data.project_name);
      formData.append("category", data.category);
      formData.append("project_description", data.project_description);
      formData.append("price", String(data.price));
      formData.append("short_Discription", data.short_Discription);
      formData.append("date", data.date);
      formData.append("status", data.status);
      if (image) {
        formData.append("project_image", image);
      }

      const response = await api.post<ProjectResponse>(
        "/project/api/projects/create",
        formData,
      );
      setProjects((currentProjects) => [
        response.data.project,
        ...currentProjects,
      ]);
      reset();
      setImage(null);
      setPreview("");
      setImageError("");
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      setShow(false);
      toast.success("Project created successfully");
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create project",
      );
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    void handleSubmit(onSubmit)(event);
  };

  const sortedItems = useMemo(() => {
    return [...projects].sort((firstProject, secondProject) => {
      const column = sortDescriptor.column as keyof ProjectRecord;
      const firstValue = firstProject[column];
      const secondValue = secondProject[column];
      const comparison =
        typeof firstValue === "number" && typeof secondValue === "number"
          ? firstValue - secondValue
          : String(firstValue ?? "").localeCompare(
              String(secondValue ?? ""),
            );

      return sortDescriptor.direction === "descending"
        ? -comparison
        : comparison;
    });
  }, [projects, sortDescriptor]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get<ProjectsResponse>(
          "/project/api/projects/all",
        );
        setProjects(response.data.projects);
        setFetchError("");
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Failed to load projects";
        setFetchError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    void fetchProjects();
  }, []);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(file);
        setPreview(reader.result);
        setImageError("");
      }
    };

    reader.onerror = () => {
      setImageError("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="w-full p-3  mt-5">
        <Button
          onClick={() => setShow(!show)}
          className="float-right bg-purple-500"
          size="lg"
        >
          {!show ? "Create Project" : "Cancel"}
        </Button>
      </div>
      {!show ? (
        <>
          <TableCard.Root size="sm" className="mt-10">
            <TableCard.Header
              title="Projects"
              badge={`${projects.length} projects`}
            />

            <Table
              aria-label="Freelancer projects"
              sortDescriptor={sortDescriptor}
              onSortChange={setSortDescriptor}
            >
              <Table.Header>
                <Table.Head
                  id="freelancer"
                  label="Freelancer"
                  isRowHeader
                  allowsSorting
                />
                <Table.Head id="status" label="Status" allowsSorting />
                <Table.Head id="project_name" label="Project" allowsSorting />
                <Table.Head id="category" label="Category" allowsSorting />
                <Table.Head id="price" label="Price" allowsSorting />
                <Table.Head id="date" label="Date" allowsSorting />
                <Table.Head id="action" label="Actions"  />
              </Table.Header>

              <Table.Body items={sortedItems}>
                {(item) => (
                  <Table.Row id={item._id}>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <MuiAvatar
                          aria-label={`${item.freelancer} avatar`}
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: "#ede9fe",
                            color: "#6d28d9",
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          {item.freelancer.trim().charAt(0).toUpperCase() ||
                            "?"}
                        </MuiAvatar>
                        <p className="text-sm font-medium whitespace-nowrap text-purple-600">
                          {item.freelancer}
                        </p>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <BadgeWithDot
                        size="sm"
                        color={item.status === "active" ? "success" : "gray"}
                        type="modern"
                      >
                        {item.status === "active" ? "Active" : "Inactive"}
                      </BadgeWithDot>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {item.project_name}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">
                      {item.category}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {item.price}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {item.date}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      <div className='flex gap-2'>
                        <Edit2Icon size={18} className='cursor-pointer text-purple-700' onClick={()=>alert(item._id)} />
                        <Trash2Icon size={18} className='cursor-pointer text-red-700' />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>

            {loading && (
              <Typography color="text.secondary" sx={{ p: 2 }}>
                Loading projects...
              </Typography>
            )}
            {!loading && fetchError && (
              <Typography color="error" sx={{ p: 2 }}>
                {fetchError}
              </Typography>
            )}
            {!loading && !fetchError && projects.length === 0 && (
              <Typography color="text.secondary" sx={{ p: 2 }}>
                No projects found.
              </Typography>
            )}
          </TableCard.Root>
        </>
      ) : (
        <>
          <form onSubmit={handleFormSubmit} className="">
            <div className="max-w-4xl">
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e3e8f0",
                }}
              >
                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Enter your project details
                  </Typography>

                  <Box>
                    <Stack spacing={2.5}>
                      <TextField
                        label="Your name for this project"
                        placeholder="Enter name of project"
                        fullWidth
                        required
                        {...register("freelancer", {
                          required: "Your name is required",
                        })}
                        error={!!errors.freelancer}
                        helperText={errors.freelancer?.message}
                      />
                      <TextField
                        label="Name of project"
                        placeholder="Enter name of project"
                        fullWidth
                        required
                        {...register("project_name", {
                          required: "Project name is required",
                        })}
                        error={!!errors.project_name}
                        helperText={errors.project_name?.message}
                      />

                      <TextField
                        label="Category of project"
                        placeholder="Enter the category"
                        fullWidth
                        required
                        {...register("category", {
                          required: "Category is required",
                        })}
                        error={!!errors.category}
                        helperText={errors.category?.message}
                      />

                      <TextField
                        label="Short description about project"
                        placeholder="Short description about project"
                        fullWidth
                        required
                        {...register("short_Discription", {
                          required: "Short description is required",
                        })}
                        error={!!errors.short_Discription}
                        helperText={errors.short_Discription?.message}
                      />

                      <TextField
                        label="Cost for the project"
                        type="number"
                        placeholder="Cost for the project"
                        fullWidth
                        required
                        slotProps={{ htmlInput: { min: 0, step: "any" } }}
                        {...register("price", {
                          required: "Project price is required",
                          valueAsNumber: true,
                        })}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                      />

                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Status
                        </InputLabel>
                        <Controller
                          name="status"
                          control={control}
                          rules={{ required: "Please select status" }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Status"
                            >
                              <MenuItem value="active">Active</MenuItem>
                              <MenuItem value="block">Block</MenuItem>
                            </Select>
                          )}
                        />

                        {errors.status && (
                          <Typography variant="caption" color="error">
                            {errors.status.message}
                          </Typography>
                        )}
                      </FormControl>

                      <TextField
                        type="date"
                        label="Project date"
                        slotProps={{ inputLabel: { shrink: true } }}
                        placeholder="Project date"
                        fullWidth
                        required
                        {...register("date", {
                          required: "Project date is required",
                        })}
                        error={!!errors.date}
                        helperText={errors.date?.message}
                      />
                      <Box>
                        <Button
                          className="bg-lime-300"
                          size="lg"
                          onClick={() => imageInputRef.current?.click()}
                        >
                          Choose Image
                        </Button>
                        <input
                          ref={imageInputRef}
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        {imageError && (
                          <Typography color="error" variant="caption">
                            {imageError}
                          </Typography>
                        )}
                      </Box>
                      <Controller
                        name="project_description"
                        control={control}
                        rules={{
                          validate: (value) =>
                            Boolean(value?.replace(/<[^>]*>/g, "").trim()) ||
                            "Description is required",
                        }}
                        render={({ field, fieldState }) => (
                          <>
                            <RichTextEditor
                              value={field.value}
                              onChange={field.onChange}
                              fromPreview={false}
                            />
                            {fieldState.error && (
                              <Typography color="error" variant="caption">
                                {fieldState.error.message}
                              </Typography>
                            )}
                          </>
                        )}
                      />

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
                      <Button
                        type="submit"
                        className="bg-purple-500"
                        isDisabled={isSubmitting}
                      >
                        {isSubmitting ? "Creating..." : "Create Project"}
                      </Button>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </div>
          </form>
        </>
      )}
    </>
  );
};
