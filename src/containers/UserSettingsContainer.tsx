import React from "react";
import { makeStyles, Paper, Typography, Grid } from "@material-ui/core";
import UserSettingsForm from "../components/UserSettingsForm";
import { Interpreter } from "xstate";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";
import { useService } from "@xstate/react";
import { ReactComponent as PersonalSettingsIllustration } from "../svgs/undraw_personal_settings_kihd.svg";
import AvatarEdit from "components/AvatarEdit";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export interface Props {
  authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
}

const UserSettingsContainer: React.FC<Props> = ({ authService }) => {
  const classes = useStyles();
  const [authState, sendAuth] = useService(authService);

  const currentUser = authState?.context?.user;
  const updateUser = (payload: any) => sendAuth("UPDATE", payload);

  return (
    <Paper className={classes.paper}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        User Settings
      </Typography>
      <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
        <Grid item>
          <PersonalSettingsIllustration style={{ height: 200, width: 300 }} />
        </Grid>
        <Grid item style={{ width: "50%" }}>
          {currentUser && <UserSettingsForm userProfile={currentUser} updateUser={updateUser} />}
        </Grid>
        <Grid item /*style={{ width: "50%" }}*/>
          {currentUser && <AvatarEdit id={currentUser.id} avatar={currentUser.avatar} updateUser={updateUser} />}
        </Grid>
      </Grid>
    </Paper>
  );
};
export default UserSettingsContainer;
