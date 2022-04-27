import { DragEvent, FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";

import { EntriesContext } from "../../../context/entries";
import { UIContext } from "../../../context/ui";

import { EntryStatus } from "../../../interfaces";
import { EntryCard } from "../";

import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);

  const {isDragging, endDragging} = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const entryId = event.dataTransfer.getData("text/plain");

    const entry = entries.find(e => e._id === entryId)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop} className={isDragging ? styles.dragging : ''}>
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflowY: "scroll",
          backgroundColor: "transparent",
          padding: "1px 5px",
        }}
      >
        {/* Todo cambiará dependiendo si esto es drag o no */}
        <List sx={{ opacity: isDragging ? 0.2 : 1, marginBottom: "3rem", transition: 'all .3s' }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
