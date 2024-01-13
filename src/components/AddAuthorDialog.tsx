import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Box,
  Stack,
} from "@mui/material";
import { AuthorItem } from "./SelectAuthors";
import { useEffect, useState } from "react";

export function AddAuthorDialog({
  openModal,
  onFinish,
}: {
  openModal: boolean;
  onFinish: (author?: AuthorItem) => void;
}) {
  const [mode, setMode] = useState<"twitter" | "manual" | undefined>(undefined);

  // Reset mode when modal is reopen
  useEffect(() => {
    if (openModal) setMode(undefined);
  }, [openModal]);

  return (
    <Dialog open={openModal} onClose={() => onFinish()}>
      <DialogTitle>작가 추가하기</DialogTitle>
      <DialogContent>
        {mode === "twitter" ? (
          <></>
        ) : mode === "manual" ? (
          <></>
        ) : (
          <Stack spacing={1}>
            <Button variant="outlined" onClick={() => setMode("twitter")}>
              트위터 유저네임으로 추가
            </Button>
            <Button variant="outlined" onClick={() => setMode("manual")}>
              수동으로 추가하기
            </Button>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        {mode ? (
          <Button onClick={() => setMode(undefined)}>돌아가기</Button>
        ) : (
          <Button onClick={() => onFinish()}>취소</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
