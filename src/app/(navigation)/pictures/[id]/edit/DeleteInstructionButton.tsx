import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export function DeleteInstructionButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={()=>setOpen(true)}>삭제 방법</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>삭제하는 방법</DialogTitle>
        <DialogContent>
          퍼픽에 올라간 작품들은 여러 명의 유저들이 같이 연결되어 있어
          일방적으로 삭제하기 어려워요.
          <br />
          연결된 모든 유저들이 연결을 해제하면 자동적으로 삭제되는 방식이에요.
          <br />
          본인 그리고 본인의 캐릭터를 연결 해제하고, 다른 유저들에게 연결을
          해제해달라고 요청해주세요.
          <br />
          그게 어려운 경우에는 트위터 <Link href="twitter.com/astydragon">@AstyDragon</Link>으로 DM을
          보내주시면 도움을 드릴게요.
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
