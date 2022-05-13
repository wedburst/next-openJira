import { FC, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from 'next'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  RadioGroup,
  TextField,
  Radio,
  capitalize,
  IconButton,
} from "@mui/material";
import { EntriesContext } from "../../context/entries";
import { dbEntries } from "../../database";
import { Layout } from "../../components/layouts";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { EntryStatus, Entry } from "../../interfaces";
import { dateFunctions } from "../../utils";
import { useRouter } from "next/router";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
entry: Entry;
}

const EntryPage:FC<Props> = ({entry}) => {
  const router = useRouter();

  const {updateEntry, deleteEntry} = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
      setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
      console.log({inputValue, status});

      if(inputValue.trim().length === 0) return;

      const updatedEntry: Entry = {
        ...entry,
        status,
        description: inputValue,
      }

      updateEntry(updatedEntry, true);
  }

  const onDelete = () => {
    deleteEntry(entry._id);
    router.push("/");
  }
  
  return (
    <Layout title={ inputValue.substring(0, 20) + '...' }>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader={`Creada: ${dateFunctions.getFormatDiscanceToNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva Entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={handleInputChange}
                helperText={isNotValid  && "Campo obligatorio"}
                error={isNotValid}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup 
                    row
                    value={ status }
                    onChange={ onStatusChanged }
                >
                  {validStatus.map((optiion) => (
                    <FormControlLabel
                      key={optiion}
                      value={optiion}
                      control={<Radio />}
                      label={capitalize(optiion)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={ onSave }
                disabled={inputValue.length <= 0}
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
        onClick={onDelete}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const {id} = params as {id: string};
    const entry = await dbEntries.getEntryById(id);

    if(!entry){
        return{
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
          entry,
        }
    }
}

export default EntryPage;
