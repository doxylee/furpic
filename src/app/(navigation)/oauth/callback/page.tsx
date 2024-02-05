"use client";

import { useUser, userSingleton } from "@/utils/useUser";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function TwitterOauthCallbackPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const errorStr = searchParams.get("error");
  const userController = useUser();
  const router = useRouter();
  const requestSent = useRef(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (errorStr) {
      setError(errorStr);
      return;
    }
    if (!state || !code) {
      router.replace("/");
      return;
    }
    if (requestSent.current) return;
    requestSent.current = true;
    try {
      userController.loginFromOAuthCallback(state, code, router.replace);
    } catch (e: any) {
      setError(e.message);
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {error ? (
        <div>
          <Typography variant="h2" fontSize={36} mb={4}>
            에러가 발생했습니다 :(
          </Typography>
          <Typography variant="body1" fontSize={16} mb={16}>
            원인: {error}
          </Typography>
          <Button
            sx={{ width: 1 }}
            variant="contained"
            onClick={() => userController.startOAuth()}
          >
            로그인 재시도
          </Button>
        </div>
      ) : (
        <CircularProgress className="text-white" color="inherit" />
      )}
    </Box>
  );
}
