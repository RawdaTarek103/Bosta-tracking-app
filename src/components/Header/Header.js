import React, { useState } from 'react';
import { Container, Grid, Box } from '@material-ui/core'
import styles from './header.module.css'
import i18n from '../../i18n';
import { withNamespaces } from 'react-i18next';
import hamburger from "../../assets/hamburger.svg"
import { withRouter } from "react-router";

export const Header = withNamespaces()(withRouter(({ t, history }) => {

    const [showDropdown, toggleShowDropdown] = useState(false)
    const languageHandler = () => {
        if (i18n.language === "ar")
            i18n.changeLanguage("en")
        else
            i18n.changeLanguage("ar")
        document.body.dir = i18n.dir();
    }
    return (
        <div className={styles['container']}>
        <Container maxWidth='lg' className = {styles['header-container']} >
            <Grid container justifyContent="space-between">
                <Grid item md={6} lg={6} className={styles['nav-items-container']}  >
                    <Box className={styles['logo-container']} >
                        <img alt = "" src={i18n.language === "ar" ?
                            "https://bosta.co/wp-content/uploads/2019/08/Component.svg" :
                            "https://bosta.co/wp-content/uploads/2019/08/bosta_logo_en_red.svg"}
                            className={styles['logo']} />
                    </Box>
                    <Box display={{ xs: "none", md: "unset" }} width="60%">
                        <Grid container className={styles['nav-items']}>
                            <Grid item md={3} lg={3} >
                                <Box className={styles['nav-item']} onClick = {()=>history.push("/")} >
                                    {t("HOME")}
                                </Box>
                            </Grid>
                            <Grid item md={3} lg={3} >
                                <Box className={styles['nav-item']} >
                                    {t("PRICES")}
                                </Box>
                            </Grid>
                            <Grid item md={4} lg={4} >
                                <Box className={styles['nav-item']} >
                                    {t("CONTACT_SALES")}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item md={4} lg={3} >
                    <Box display={{ xs: "none", md: "unset" }}>
                        <Grid container className={styles['header-actions']} justifyContent="space-around" >
                            <Grid item >
                                <Box className={styles['nav-item']} >
                                    {t("TRACK_YOUR_SHIPMENT")}
                                </Box>
                            </Grid>
                            <Grid item md={1} lg={1} style={{ display: 'flex' }}>
                                <div className={styles['v-separator']}></div>
                            </Grid>
                            <Grid item  >
                                <Box className={styles['nav-item']} >
                                    {t("SIGN_IN")}
                                </Box>
                            </Grid>
                            <Grid item md={3} lg={2}  >
                                <Box className={styles['nav-item']} onClick={() => languageHandler()} >
                                    {t("LANG")}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box display={{ md: "none" }} className={styles['icon-container']}
                        onClick={() => toggleShowDropdown(prevState => !prevState)}>
                        <img alt = "" src={hamburger} className={styles['icon']} />
                    </Box>
                </Grid>
            </Grid>
            <Grid container  >
                <Grid item xs={12} className={showDropdown ?
                    `${styles['dropdown-container']} ${styles['show-dropdown']}`
                    : `${styles['dropdown-container']} ${styles['hide-dropdown']}`}>
                    <Box className={styles['dropdown-options']} onClick = {()=>history.push("/")} >{t("HOME")}</Box>
                    <Box className={styles['dropdown-options']}>{t("PRICES")}</Box>
                    <Box className={styles['dropdown-options']}>{t("CONTACT_SALES")}</Box>
                    <Box className={styles['dropdown-options']}>{t("TRACK_YOUR_SHIPMENT")}</Box>
                    <Box className={styles['dropdown-options']} style={{ border: "none" }}>{t("SIGN_IN")}</Box>
                </Grid>
            </Grid>
        </Container>
        </div>
    )
}))


