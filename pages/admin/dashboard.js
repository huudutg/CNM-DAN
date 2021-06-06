// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DateRange from "@material-ui/icons/DateRange";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
// layout for this page
import Admin from "layouts/Admin.js";
import React, { useEffect, useState } from "react";
import { getCurrentWalletConnected } from '../../ethereum/utils/interact';
import web3 from '../../ethereum/web3';
import axios from 'axios'


function Dashboard() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [balance, setbalance] = useState()
  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    const url = `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=AE2PE8JY2TQMX26XVQCYXSK7GDTVPDWC6Y`
    const transactions = await axios.get(url)
    console.log('%ctransactions ', 'color: blue;', transactions)
    const accounts = await web3.eth.getBalance(address, (err, balance) => {
      const balanceETH = web3.utils.fromWei(balance, "ether")
      console.log('%c balanceETH', 'color: blue;', balanceETH)
      setbalance(parseFloat(balanceETH).toFixed(4))
    });
  }, [])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="dark" stats icon>
              <CardIcon color="dark">
                <AttachMoneyIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Balance</p>
              <h3 className={classes.cardTitle} style={{ fontWeight: "600" }}>{balance} ETH</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>

      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

Dashboard.layout = Admin;

export default Dashboard;
