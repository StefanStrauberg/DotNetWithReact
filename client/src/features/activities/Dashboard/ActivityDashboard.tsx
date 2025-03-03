import { Grid2 } from "@mui/material";
import { Activity } from "../../../lib/types/Activity";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activities: Activity[];
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  selectedActivity?: Activity;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
};

export default function ActivityDashboard({
  activities,
  selectActivity,
  cancelSelectActivity,
  selectedActivity,
  openForm,
  editMode,
  closeForm,
}: Props) {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
        />
      </Grid2>
      <Grid2 size={5}>
        {selectedActivity && !editMode && (
          <ActivityDetail
            selectedActivity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openFrom={openForm}
          />
        )}
        {editMode && (
          <ActivityForm activity={selectedActivity} closeForm={closeForm} />
        )}
      </Grid2>
    </Grid2>
  );
}
