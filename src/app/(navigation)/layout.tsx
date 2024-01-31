"use client";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useUser } from "@/utils/useUser";

export default function NavigationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userController = useUser();
  const user = userController.user;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#222" }}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Stack direction="row" alignItems="baseline" spacing={4}>
            <Link href="/">
              <Typography variant="h4" component="div">
                FurPic
              </Typography>
            </Link>
            <Link href="/drawings">
              <Typography variant="h5" component="div">
                그림
              </Typography>
            </Link>
            <Link href="/photos">
              <Typography variant="h5" component="div">
                사진
              </Typography>
            </Link>
            <Link href="/characters">
              <Typography variant="h5" component="div">
                캐릭터
              </Typography>
            </Link>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar src={user.xsImage ?? undefined} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link href={`/users/@${user.username}`}>내 프로필</Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    userController.logout();
                  }}
                >
                  로그아웃
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" onClick={() => userController.startOAuth()}>
              로그인
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div>{children}</div>
    </>
  );
}
