import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import useWindowSize from "components/Hooks/useWindowSize.js";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import AddIcon from '@material-ui/icons/Add';
// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/nextjs-material-dashboard/components/headerLinksStyle.js";

export default function AdminNavbarLinks() {
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <div>
      
      <div className={classes.manager}>
        <Button
          className={classes.buttonLink}
          color="info"
        >
          <AddIcon className={classes.icons} />
          <span>Connect Account</span>
        </Button>
       </div>
     </div>
  );
}
