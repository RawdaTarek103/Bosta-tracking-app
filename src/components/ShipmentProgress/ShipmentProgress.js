import React from 'react'
import styles from './shipmentProgress.module.css'
import { Container, Grid } from '@material-ui/core'
import { StepView } from '../StepView/StepView'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next';

export const ShipmentProgress = withNamespaces()(({ t, reason, shipmentNum, shipmentStatus, lastUpdate, promisedDate, senderName, isValid, active }) => {
    let color = ""
    if (!isValid) {
        color = "red"
    } else if (active === 3) {
        color = "green"
    } else {
        color = "orange"
    }
    return (
        <Container maxWidth='lg' className={styles['container']} disableGutters={true} >
            <Grid container className={styles['title-section']} >
                <Grid item xs = {12} sm={6} md={3}>
                    <span className={styles['title-text']}>{t("SHIPMENT_NUMBER") + " " + shipmentNum}</span><br />
                    <span className={`${styles['info-text']} ${styles[color]}`}>{shipmentStatus}</span>
                </Grid>
                <Grid item xs = {12} sm={6} md={4}>
                    <span className={styles['title-text']}>{t("LAST_UPDATE")}</span><br />
                    <span className={styles['info-text']}>{lastUpdate}</span>
                </Grid>
                <Grid item xs = {12} sm={6} md={3}>
                    <span className={styles['title-text']}>{t("SENDER_NAME")}</span><br />
                    <span className={styles['info-text']}>{senderName}</span>

                </Grid>
                <Grid item xs = {12} sm={6} md={2}>
                    {promisedDate ?
                        <><span className={styles['title-text']}>{t("DELIVERY_DATE")}</span><br />
                            <span className={styles['info-text']}>{promisedDate}</span></>
                        : ""}
                </Grid>
            </Grid>
            <Grid container>
                <StepView active={active} color={color} reason = {reason} />
            </Grid>
        </Container>
    )
})
ShipmentProgress.propTypes = {
    shipmentNum: PropTypes.string,
    shipmentStatus: PropTypes.string,
    lastUpdate: PropTypes.string,
    promisedDate: PropTypes.string,
    senderName: PropTypes.string,
    shipmentDetails: PropTypes.array,
    isValid: PropTypes.bool
};

ShipmentProgress.defaultProps = {
    senderName: "SOUQ.COM",
};