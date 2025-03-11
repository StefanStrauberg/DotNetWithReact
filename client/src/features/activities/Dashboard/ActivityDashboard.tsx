import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityFilter from "./ActivityFilter";

export default function ActivityDashboard() {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={8}>
        <ActivityList />
      </Grid2>
      <Grid2 size={4}>
        <ActivityFilter />
      </Grid2>
    </Grid2>
  );
}
