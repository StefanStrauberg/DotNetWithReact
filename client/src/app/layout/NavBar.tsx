import { Group } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLinks from "../shared/components/MenuItemLinks";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            "linear-gradient(35deg, #182a73 0%, #218aae 69%, #20a7ac)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <MenuItem
                component={NavLink}
                to="/"
                sx={{ display: "flex", gap: 2 }}
              >
                <Group fontSize="large" />
                <Typography variant="h4" fontWeight="bold">
                  Reactivities
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: "flex" }}>
              <MenuItemLinks to="/activities">Activities</MenuItemLinks>
              <MenuItemLinks to="/createActivity">
                Create activity
              </MenuItemLinks>
              <MenuItemLinks to="/counter">Counter</MenuItemLinks>
            </Box>
            <MenuItem>User menu</MenuItem>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
