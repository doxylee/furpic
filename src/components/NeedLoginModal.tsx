"use client";

import { useUser } from "@/utils/useUser";
import { Backdrop, Button, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import XIcon from "@mui/icons-material/X";


export function NeedLoginModal() {
  const userController = useUser();
  const [testLogin, setTestLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => setTestLogin(true), 1000);
  }, []);

  return (
    <Backdrop open={!userController.user && testLogin} sx={{ zIndex: 10000 }}>
      <Paper sx={{ p: 4 }}>
        <Stack alignItems="center" spacing={4}>
          <Typography>로그인이 필요한 페이지에요</Typography>
          <Button
            variant="contained"
            onClick={() => userController.startOAuth()}
            sx={{backgroundColor: "black", "&:hover": {backgroundColor: "#333"}}}
          >
            <XIcon/>로 로그인
          </Button>
        </Stack>
      </Paper>
    </Backdrop>
  );
}
