import React from 'react'
import styles from './stepView.module.css'
import { Container, Grid, Box } from '@material-ui/core'
import checkMarkGreen from '../../assets/check-mark-green.svg'
import checkMarkOrange from '../../assets/check-mark-orange.svg'
import checkMarkRed from '../../assets/check-mark-red.svg'
import shippingTruckGray from '../../assets/shipping-truck-gray.svg'
import shippingTruckWhite from '../../assets/shipping-truck-white.svg'
import handTruckWhite from '../../assets/hand-truck-white.svg'
import handTruckGray from '../../assets/hand-truck-gray.svg'
import delivered from '../../assets/delivered.svg'
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types'

const steps = ["TICKET_CREATED", "PACKAGE_RECEIVED", "OUT_FOR_DELIVERY", "DELIVERED"]
const icons = {
    g1: handTruckGray,
    w1: handTruckWhite,
    g2: shippingTruckGray,
    w2: shippingTruckWhite,
    g3: delivered,
}

export const StepView = withNamespaces()(({ t, color, active, reason }) => {
    const stepStyle = []

    let arr = []
    if ("red".localeCompare(color) === 0 ) {
        for (let i = 0; i < 4; i++) {
            if (active > i) {
                arr.push(checkMarkRed)
                stepStyle.push(styles['step-marked'])
            }
            else if (active === i) {
                stepStyle.push(`${styles['step']} ${styles[color]}`)
                arr.push(icons[`w${i}`])
            }
            else {
                arr.push(icons[`g${i}`])
                stepStyle.push(styles['step'])
            }
        }
    } else if ("green".localeCompare(color) === 0) {
        arr = [checkMarkGreen, checkMarkGreen, checkMarkGreen, checkMarkGreen]
        stepStyle.push(styles['step-marked'], styles['step-marked'], styles['step-marked'], styles['step-marked'])
    } else {
        for (let i = 0; i < 4; i++) {
            if (active > i) {
                arr.push(checkMarkOrange)
                stepStyle.push(styles['step-marked'])
            }
            else if (active === i) {
                stepStyle.push(`${styles['step']} ${styles[color]}`)
                arr.push(icons[`w${i}`])
            }
            else {
                arr.push(icons[`g${i}`])
                stepStyle.push(styles['step'])
            }
        }
    }

    return (
        <Container>
            <Grid container justifyContent="center"  style={{ marginTop: "20px" }}>
                {steps.map((step, index) => (
                    <div style={index === 0 || index === 3 ? { width: "20%" } : { width: "30%" }} key={index} >
                        <Box display="flex" alignItems="center" >
                            {index === 0 ? "" : <div className={active < index ? styles['h-separator'] : `${styles['h-separator']} ${styles[color]}`}></div>}

                            <div className={stepStyle[index]}>
                                <img alt="" src={arr[index]} className={`${styles['icon']}`} />
                            </div>
                            {index === 3 ? "" : <div className={active <= index ? styles['h-separator'] : `${styles['h-separator']} ${styles[color]}`}></div>}
                        </Box>
                        <Box className={styles['info-text']} style={index === 0 ? { textAlign: 'start' } : index === 3 ? { textAlign: 'end' } : { textAlign: 'center' }}>
                            {t(step)}
                        </Box>
                        {index === 2 && reason &&
                        <Box className={` ${styles["text-"+color]}`} style={index === 0 ? { textAlign: 'start' } : index === 3 ? { textAlign: 'end' } : { textAlign: 'center' }}>
                            {reason}
                        </Box>}
                    </div>
                ))}

            </Grid>
        </Container>
    )
})
StepView.propTypes = {
    color: PropTypes.string,

};

StepView.defaultProps = {

};