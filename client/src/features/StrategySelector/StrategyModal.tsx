import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { ReactElement, useState } from "react";
import { StrategyContent } from "./StrategyContent";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  content: StrategyContent;
}

interface IIndexable {
  [key: string]: any;
}

type OrderSide = "BUY" | "SELL";

export default function StrategyModal({ content }: Props): ReactElement {
  const { name, inputs } = content;
  const [open, setOpen] = useState(false);
  const [interval, setInterval] = useState(10);
  const [amount, setAmount] = useState<Number>();
  const [price, setPrice] = useState<Number>();
  const [side, setSide] = useState<OrderSide>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleIntervalChange = (value: string) => {
    setInterval(Number(value));
  };
  const handleAmountChange = (value: string) => {
    setAmount(Number(value));
  };
  const handlePriceChange = (value: string) => {
    setPrice(Number(value));
  };
  const handleSideChange = (value: string) => {
    setSide(value as OrderSide);
  };

  const inputValues: IIndexable = {
    interval: interval,
    amount: amount,
    price: price,
  };

  const inputSetters: IIndexable = {
    interval: handleIntervalChange,
    amount: handleAmountChange,
    price: handlePriceChange,
    side: handleSideChange,
  };

  const requestBody = {
    ...(interval && { interval }),
    ...(amount && { amount }),
    ...(price && { price }),
    ...(side && { side }),
  };

  return (
    <div>
      <Button onClick={handleOpen}>Start</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {name}
          </Typography>

          {inputs.map((input, index) =>
            !input.options ? (
              <FormControl key={index}>
                <InputLabel htmlFor={input.name}>{input.name}</InputLabel>
                <Input
                  id={input.name}
                  type="number"
                  value={inputValues[input.name]}
                  onChange={(e) =>
                    inputSetters[input.name](e.currentTarget.value)
                  }
                />
              </FormControl>
            ) : (
              <FormControl key={index}>
                <InputLabel htmlFor={input.name}>{input.name}</InputLabel>
                <Select
                  onChange={(e: SelectChangeEvent<string>) =>
                    inputSetters[input.name](e.target.value as string)
                  }
                >
                  {input.options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )
          )}
          <Button
            onClick={() => {
              console.log(requestBody);

              handleClose();
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}