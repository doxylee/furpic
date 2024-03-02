"use client";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
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

import HomeIcon from "@mui/icons-material/Home";
import ImageIcon from "@mui/icons-material/Image";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PetsIcon from "@mui/icons-material/Pets";

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

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#222" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Stack direction="row" spacing={4} alignItems="baseline">
            <Link href="/">
              <Typography variant="h4" component="div">
                FurPic
              </Typography>
            </Link>
            <Stack
              direction="row"
              spacing={4}
              display={{ xs: "none", sm: "flex" }}
            >
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
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <>
              <Box display={{ xs: "none", md: "block" }} mr={1}>
                <Link href="/post">
                  <Button variant="contained">작품 올리기</Button>
                </Link>
              </Box>
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
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ backgroundColor: "#222", height: "100%", color: "white" }}>
          <List>
            {[
              { icon: <HomeIcon />, name: "홈", href: "/" },
              { icon: <ImageIcon />, name: "그림", href: "/drawings" },
              { icon: <CameraAltIcon />, name: "사진", href: "/photos" },
              { icon: <PetsIcon />, name: "캐릭터", href: "/characters" },
            ].map(({ icon, name, href }) => (
              <Link href={href} onClick={() => setDrawerOpen(false)} key={href}>
                <ListItem
                  sx={{
                    px: 4,
                    "&:hover": {
                      backgroundColor: "#111",
                      transition: "background-color 0.3s",
                    },
                  }}
                >
                  {icon}
                  <Typography variant="h5" component="div" ml={2} pt="3px">
                    {name}
                  </Typography>
                </ListItem>
              </Link>
            ))}
            <Divider />
            <ListItem>
              <Link
                href="/post"
                style={{ width: "100%" }}
                onClick={() => setDrawerOpen(false)}
              >
                <Button variant="contained" fullWidth>
                  작품 올리기
                </Button>
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <div>{children}</div>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={4}
        sx={{ mt: 4, color: "gray", fontSize: 12 }}
        flexWrap="wrap"
      >
        <Link href="https://astydragon.notion.site/astydragon/12925efcb7654158b6eb11fea3279e19">
          이용약관
        </Link>
        <Link href="https://plip.kr/pcc/a033ddb5-9da4-4f2d-b563-5952518e4f31/privacy/1.html">
          개인정보 처리방침
        </Link>
        <div>
          Made by{" "}
          <Link href="https://twitter.com/AstyDragon" target="_blank">
            @AstyDragon
          </Link>
        </div>
      </Stack>
    </>
  );
}
