import { User } from "@/_interface/backend/entities/user";
import {
  Card,
  CardContent,
  CardMedia,
  SxProps,
  Typography,
} from "@mui/material";
import { MouseEventHandler } from "react";

export function UserCard({
  user,
  onClick,
  sx,
}: {
  user: User;
  onClick?: MouseEventHandler<HTMLDivElement>;
  sx?: SxProps;
}) {
  return (
    <Card
      onClick={onClick}
      sx={{ cursor: onClick ? "pointer" : "auto", borderRadius:"50em 50em 0 0", ...sx }}
    >
      <CardMedia
        image={user.pictureURL ?? undefined}
        title={user.name}
        sx={{ paddingTop: "100%", borderRadius: "50%" }}
      />
      <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
        <Typography
          noWrap
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {user.name}
        </Typography>
        {(user.username || user.twitterUsername) && (
          <Typography
            fontSize={12}
            color="gray"
            noWrap
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            @{user.username || user.twitterUsername}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
