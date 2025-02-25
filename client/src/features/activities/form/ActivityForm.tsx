import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Activity } from "../../../lib/types/Activity";

type Props = {
  activity?: Activity;
  closeForm: () => void;
};

export default function ActivityForm({ activity, closeForm }: Props) {
  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create activity
      </Typography>
      <Box component="form" display="flex" flexDirection="column" gap={3}>
        <TextField label="Title" value={activity?.title} />
        <TextField
          label="Description"
          value={activity?.description}
          multiline
          rows={3}
        />
        <TextField label="Category" value={activity?.category} />
        <TextField type="date" />
        <TextField label="City" value={activity?.city} />
        <TextField label="Venu" value={activity?.venue} />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button onClick={closeForm} color="inherit">
            Cancel
          </Button>
          <Button color="success" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
