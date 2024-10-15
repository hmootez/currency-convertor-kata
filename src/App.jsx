import { useEffect, useState } from "react";
import "./App.css";
import {
  TextField,
  Switch,
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SimpleTable from "./components/SimpleTable.jsx";
import { useConvert } from "./hooks/Convert.jsx";
import Header from "./components/header.jsx";

const headers = [
  "Taux réel",
  "Taux saisi",
  "Valeur",
  "Devise",
  "Résultat",
  "Devise",
];

function App() {
  const [changeRate, setChangeRate] = useState(1.1);
  const [manualChangeRate, setManualChangeRate] = useState(0);
  const [actualChangeRate, setActualChangeRate] = useState(1.1);
  const [changeToUSD, setChangeToUSD] = useState(true);
  const [fixRate, setFixRate] = useState(false);
  const [inputValue, setInputValue] = useState();

  const { handleConvert, history, result } = useConvert();

  useEffect(() => {
    if (inputValue) {
      handleConvert(
        inputValue,
        false,
        changeToUSD,
        changeRate,
        actualChangeRate,
        manualChangeRate,
      );
    }
  }, [changeToUSD, changeRate, inputValue, handleConvert]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRate = 1.1 + (Math.random() * 0.1 - 0.05);
      setActualChangeRate(newRate);
      if (fixRate) {
        // variation more than 2%
        if (
          Math.abs(((newRate - manualChangeRate) / manualChangeRate) * 100) > 2
        ) {
          setChangeRate(newRate);
          setFixRate(false);
        } else {
          setChangeRate(manualChangeRate);
        }
      } else {
        setChangeRate(newRate);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [fixRate]);

  return (
    <>
      <Header />
      <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
        Taux de change réel EUR / USD : <b>{actualChangeRate.toFixed(2)}</b>
      </Box>
      <Box data-testid="fix-rate-checkbox">
        <FormGroup>
          <FormControlLabel
            control={<Checkbox onChange={() => setFixRate(!fixRate)} />}
            label="Fixer le taux de change"
          />
        </FormGroup>
      </Box>
      <Box>
        <TextField
          variant="outlined"
          type="number"
          id="outlined-basic"
          data-testid="manual-rate-input"
          label={"Taux de change EUR / USD"}
          placeholder="Entrer une valeur"
          onChange={(e) => {
            setManualChangeRate(Number(e.target.value));
          }}
        />
      </Box>
      <Grid container sx={{ width: "100%" }}>
        <Grid size={2}>
          <TextField
            variant="outlined"
            data-testid="value-input"
            margin="normal"
            type="number"
            id="outlined-basic"
            label={changeToUSD ? "Euro" : "Dollar américain"}
            placeholder="Entrer une valeur"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </Grid>
        <Grid size={2}>
          <Box sx={{ marginTop: 2 }}>
            {changeToUSD ? <b>EUR / USD</b> : <b>USD / EUR</b>}
            <Switch
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#029597", // Thumb color when checked
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#029597", // Track color when checked
                },
                "& .MuiSwitch-switchBase": {
                  color: "#029597", // Thumb color when unchecked
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "#029597", // Track color when unchecked
                },
              }}
              data-testid="switch"
              checked={changeToUSD}
              onChange={() => setChangeToUSD(!changeToUSD)}
            />
          </Box>
        </Grid>
        <Grid size={2} sx={{ marginTop: 6 }}>
          <Button
            sx={{
              color: "#fff",
              backgroundColor: "#029597",
              "&:hover": {
                backgroundColor: "#029597",
              },
            }}
            variant="contained"
            onClick={() =>
              handleConvert(
                inputValue,
                true,
                changeToUSD,
                changeRate,
                actualChangeRate,
                manualChangeRate,
              )
            }
            data-testid="convert-button"
          >
            Convertir
          </Button>
        </Grid>
        <Grid size={4}>
          <Box p={1} sx={{ marginTop: 4 }}>
            <Typography variant="h6">
              Résultat :{" "}
              <span style={{ color: "#970202" }} data-testid="output">
                {result}
              </span>
              <b>{changeToUSD ? "  USD" : "  EUR"}</b>
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <SimpleTable title={"Historique"} headers={headers} data={history} />
    </>
  );
}

export default App;
