import { useMemo, useState } from "react";
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
import { Layout } from "../../components/layouts";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { EntryStatus } from "../../interfaces";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

const EntryPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<EntryStatus>("pending");
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
  }

  return (
    <Layout title="">
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader="creada el: 10/10/2020"
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
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

export default EntryPage;
