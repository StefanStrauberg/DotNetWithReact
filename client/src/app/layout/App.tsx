import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/Dashboard/ActivityDashboard";
import { useEffect, useState } from "react";
import { Activity } from "../../lib/types/Activity";
import axios from "axios";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5001/api/activities")
      .then((response) => setActivities(response.data));
  }, []);

  return (
    <Box sx={{ bgcolor: "#eeeeee" }}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </Box>
  );
}

export default App;
