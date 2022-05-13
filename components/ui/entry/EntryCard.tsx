import { DragEvent, FC, useContext } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { Entry } from "../../../interfaces";
import { UIContext } from "../../../context/ui";
import { dateFunctions } from "../../../utils";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);
  const router = useRouter();

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData("text/plain", entry._id);

    startDragging();
  };

  const onDragEnd = (event: DragEvent) => {
    endDragging();
  };

  const onClickCard = () => {
    console.log("clicked card" + entry._id);
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      onClick={onClickCard}
      sx={{ marginBottom: 1, padding: 0 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">{dateFunctions.getFormatDiscanceToNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
