import React from 'react';
import styles from './shipmentReport.module.css'
import report from '../../assets/report.svg'
import { Grid } from '@material-ui/core'
import { withNamespaces } from 'react-i18next';

export const ShipmentReport = withNamespaces()(({t }) => {
    return (
        <Grid container className={styles['container']}>
            <Grid item xs={12} lg={5} >
                <div style={{ width: "fit-content", margin: "auto" }}>
                    <img alt = "" className={styles['icon']} src={report} />
                </div>
            </Grid>
            <Grid item xs={12} lg={7} >
                <div style={{ width: "fit-content", margin: "auto" }} >
                    <div className={styles['text']} >{t("IS_THERE_A_PROBLEM")}</div>
                    <button className={styles['button-style']}>{t("REPORT")}</button>
                </div>
            </Grid>
        </Grid>
    )
})


