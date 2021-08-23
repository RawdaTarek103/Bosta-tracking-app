import React from 'react'
import styles from "./shipmentDetails.module.css"
import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody } from '@material-ui/core'
import { withNamespaces } from 'react-i18next';
import { getDate, getTime } from '../../utility'
import i18next from 'i18next';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types'

export const ShipmentDetails = withNamespaces()(({ t, shipmentDetails }) => {
    return (
        <div >
            <div className={styles['table-title']} >{t("SHIPMENT_DETAILS")}</div>
            <Box display={{ xs: "none", md: "unset" }} >
                <TableContainer className={styles['table-container']} >
                    <Table>
                        <TableHead className={styles['table-head']} >
                            <TableRow >
                                <TableCell className={styles['teble-cell']} > {t("HUB")} </TableCell>
                                <TableCell className={styles['teble-cell']} > {t("DATE")} </TableCell>
                                <TableCell className={styles['teble-cell']} > {t("TIME")} </TableCell>
                                <TableCell className={styles['teble-cell']} > {t("DETAILS")} </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shipmentDetails.map((el, index) => (
                                i18next.exists(el.state) ?
                                    <TableRow key={index}>
                                        <TableCell className={styles['teble-cell']} >{el.hub}</TableCell>
                                        <TableCell className={styles['teble-cell']} >{getDate(el.timestamp)}</TableCell>
                                        <TableCell className={styles['teble-cell']} >{getTime(el.timestamp)}</TableCell>
                                        <TableCell className={styles['teble-cell']} >{t(el.state)+" "+(el.reason ?? "")}</TableCell>
                                    </TableRow>
                                    : ""
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer >
            </Box>
            <Box display={{ xs: "unset", md: "none" }} >
                {shipmentDetails.map((el, index) => (
                    i18next.exists(el.state) ?
                        <Box key={index} mt = {2}>
                            <Box className={styles['details']} > {t(el.state) + " " + (el.reason ?? "")} </Box>
                            <Box className={styles['details']} > {getDate(el.timestamp)} </Box>
                        </Box>
                        : ""
                ))}
            </Box>
        </div>
    )
})

ShipmentDetails.propTypes = {
    shipmentDetails: PropTypes.array,

};

ShipmentDetails.defaultProps = {
    
};