import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Activity } from "../../../lib/types/Activity";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
  selectedActivity: Activity;
  cancelSelectActivity: () => void;
  openFrom: (id: string) => void;
};

export default function ActivityDetail({
  selectedActivity,
  cancelSelectActivity,
  openFrom,
}: Props) {
  const { activities } = useActivities();
  const activity = activities?.find((x) => x.id === selectedActivity.id);

  if (!activity) return <Typography>Loading...</Typography>;

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia
        component="img"
        src={`/images/categoryImages/${activity.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1">{activity.date}</Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => openFrom(activity.id)} color="primary">
          Edit
        </Button>
        <Button onClick={cancelSelectActivity} color="inherit">
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
