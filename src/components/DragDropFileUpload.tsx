import { Box, CircularProgress, IconButton, Paper, Typography } from "@mui/material";
import { ChangeEventHandler, DragEventHandler, useState } from "react";

export function DragDropFileUpload({
  icon,
  description,
  check,
  onFileUpload,
  onImageURL,
  onBlur,
}: {
  icon: React.ReactNode;
  description?: string;
  check?: (file: File) => boolean;
  onFileUpload: (file: File) => void;
  onImageURL: (imagePreview: string) => void;
  onBlur?: () => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDragOver: DragEventHandler = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave: DragEventHandler = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleDrop: DragEventHandler = (event) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      handleFileChange(files[0]);
    }
  };

  const handleFileChange = (file: File) => {
    if (check && !check(file)) return;
    setLoading(true);
    onFileUpload(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLoading(false);
      onImageURL(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      handleFileChange(files[0]);
    }
  };

  return (
    <Paper
      variant="outlined"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        border: dragOver ? "2px dashed #000" : "2px dashed #aaa",
        padding: 5,
        textAlign: "center",
        cursor: "pointer",
        background: dragOver ? "#eee" : "#fafafa",
        position: "relative",
      }}
    >
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleChange}
        onBlur={onBlur}
      />
      <label htmlFor="raised-button-file">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            cursor: "pointer",
          }}
        >
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            {icon}
          </IconButton>
          <Typography>업로드할 파일을 끌어다 놓거나 클릭하세요</Typography>
          {description && (
            <Typography fontSize={12} color="gray">
              {description}
            </Typography>
          )}
        </Box>
      </label>
      {loading && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Paper>
  );
}