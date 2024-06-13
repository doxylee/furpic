import React from "react";
import {
  Modal,
  List,
  ListItem,
  ListItemText,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getLikedUsers } from "@/_interface/backend/api/pictures";
import { UserItem } from "@/components/UserItem";

interface LikedUsersModalProps {
  pictureId: string;
  open: boolean;
  onClose: () => void;
}

const LikedUsersModal: React.FC<LikedUsersModalProps> = ({
  pictureId,
  open,
  onClose,
}) => {
  const { data } = useQuery({
    queryKey: ["pictures", "like", pictureId],
    queryFn: () => getLikedUsers(pictureId),
    enabled: open,
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { width: 1, minHeight: 400 } }}
    >
      <DialogTitle>좋아요한 사람들</DialogTitle>
      <DialogContent>
        <List>
          {data?.map((user, index) => (
            <ListItem key={index}>
              <UserItem user={user} link sx={{width: 1}} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default LikedUsersModal;
