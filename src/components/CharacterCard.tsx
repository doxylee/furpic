import { CharacterWithUser } from "@/_interface/backend/entities/character";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { MouseEventHandler } from "react";

export function CharacterCard({
  character,
  onClick,
}: {
  character: CharacterWithUser;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <Card onClick={onClick} sx={{ cursor: onClick ? "pointer" : "auto" }}>
      <CardMedia
        image={character.imageURL ?? undefined}
        title={character.nameKo || character.nameEn || undefined}
        sx={{ paddingTop: "100%" }}
      />
      <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
        <Typography
          noWrap
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {character.nameKo || character.nameEn}
        </Typography>
        {character.user && (
          <Typography
            fontSize={12}
            color="gray"
            noWrap
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {character.user.name} | @
            {character.user.username || character.user.twitterUsername}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
