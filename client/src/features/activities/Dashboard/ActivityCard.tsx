import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Activity } from "../../../lib/types/Activity";
import { Link } from "react-router";
import { AccessTime, Place } from "@mui/icons-material";
import { formatDate } from "../../../lib/util/util";

type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  const isHost = false;
  const isGoing = false;
  const lable = isHost ? "You're hosting" : "You're going";
  const isCancelled = false;
  const color = isHost ? "secondary" : isGoing ? "warning" : "default";

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <CardHeader
          avatar={<Avatar sx={{ height: 80, width: 80 }} />}
          title={
            <Typography
              component="div"
              sx={{ fontWeight: "bold", fontSize: 20 }}
            >
              {activity.title}
            </Typography>
          }
          subheader={
            <>
              Hosted by <Link to={`/profiles/bob`}>Bob</Link>
            </>
          }
        />
        <Box display="flex" flexDirection="column" gap={2} mr={2}>
          {(isHost || isGoing) && (
            <Chip label={lable} color={color} sx={{ borderRadius: 2 }} />
          )}
          {isCancelled && (
            <Chip label="Cancelled" color="error" sx={{ borderRadiu: 2 }} />
          )}
        </Box>
      </Box>

      <Divider sx={{ p: 0 }} />

      <CardContent sx={{ p: 0 }}>
        <Box display="flex" alignItems="center" mb={2} px={2}>
          <Box display="flex" flexGrow={0} alignItems="center">
            <AccessTime sx={{ mr: 1 }} />
            <Typography variant="body2" noWrap>
              {formatDate(activity.date)}
            </Typography>
          </Box>
          <Place sx={{ ml: 3, mr: 1 }} />
          <Typography variant="body2">{activity.venue}</Typography>
        </Box>
        <Divider />
        <Box
          display="flex"
          gap={2}
          sx={{ backgroundColor: "#E0E0E0", py: 3, pl: 3 }}
        >
          Attendees go here
        </Box>
      </CardContent>
      <CardContent sx={{ pb: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="body2">{activity.description}</Typography>
          <Button
            component={Link}
            to={`/activities/${activity.id}`}
            size="medium"
            variant="contained"
            sx={{ borderRadius: 3 }}
          >
            View
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
