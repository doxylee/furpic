import {
  ChangeEventHandler,
  DragEventHandler,
  useCallback,
  useState,
} from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
  SxProps,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import React from "react";

export const DragDropFileUpload = React.forwardRef(
  (
    {
      onFileUpload,
      sx,
      onBlur,
    }: {
      onFileUpload: (file: File) => void;
      sx?: SxProps;
      onBlur?: () => void;
    },
    ref,
  ) => {
    const [dragOver, setDragOver] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

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
      setLoading(true);
      onFileUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLoading(false);
        setImagePreview(reader.result as string);
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
      <Box sx={sx} ref={ref}>
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
                <ImageIcon style={{ fontSize: 60 }} />
              </IconButton>
              <Typography>업로드할 파일을 끌어다 놓거나 클릭하세요</Typography>
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
        {imagePreview && (
          <Grid container justifyContent="center" style={{ marginTop: 16 }}>
            <Grid item xs={12} sm={6} md={4}>
              <img
                src={imagePreview}
                alt="Image Preview"
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
          </Grid>
        )}
      </Box>
    );
  },
);

DragDropFileUpload.displayName = "DragDropFileUpload";
