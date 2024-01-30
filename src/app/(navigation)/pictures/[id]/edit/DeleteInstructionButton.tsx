import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export function DeleteInstructionButton({
  fullWidth = false,
}: {
  fullWidth?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="outlined"
        color="warning"
        fullWidth={fullWidth}
        onClick={() => setOpen(true)}
      >
        삭제 방법
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>삭제하는 방법</DialogTitle>
        <DialogContent sx={{"& p": {mb: 1}}}>
          <p>
            퍼픽에 올라간 작품들은 여러 명의 유저들이 같이 연결되어 있어
            연결된 모든 유저들이 연결을 해제하면 자동적으로 삭제되는 방식이에요.
          </p>
          <p>
            본인 그리고 본인의 캐릭터를 연결 해제하고, 다른 유저들에게 연결을
            해제해달라고 요청해주세요.
          </p>
          <p>
            그게 어려운 경우에는 트위터{" "}
            <Link href="https://twitter.com/astydragon" style={{color: "#08f"}} target="_blank">@AstyDragon</Link>으로 DM을
            보내주세요.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
