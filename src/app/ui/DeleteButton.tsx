import { Delete } from "@mui/icons-material";
import { Button, Box } from "@mui/material";
import { deleteGame } from "../lib/action";

export default function DeleteButton({id}: {id: number}) {
  return (
    <Box
      component="form"
      action={deleteGame.bind(null, id)}
      sx={{ display: "inline" }}
    >
      <Button
        type="submit"
        size="small"
        variant="outlined"
        color="error"
        startIcon={<Delete />}
      >
        Deletar
      </Button>
    </Box>
  );
}
