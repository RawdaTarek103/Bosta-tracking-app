import React, { useState } from 'react'
import { Container, Grid, Box } from '@material-ui/core'
import { withNamespaces } from 'react-i18next';
import styles from "./home.module.css"
import search from '../../assets/search.svg'
import axios from 'axios'

const HomeView = ({ t, history }) => {

    const [shipmentNum, setShipmentNum] = useState("")
    const [isShipmentNumValid, setIsShipmentNumValid] = useState(true)

    const handleShipmentNumSubmit = async () => {
        try {
            let response = await axios.get(`https://tracking.bosta.co/shipments/track/${shipmentNum}`)
            history.push({
                pathname: '/tracking-shipment',
                search: `?track_num=${shipmentNum}`,
                state: { shipment: response.data }
            });
        } catch (error) {
            if(error.request){
                if(error.request.status === 404){
                    setIsShipmentNumValid(false)
                }
            }
        }
    }
    return (
        <Container maxWidth="lg" >
            <Grid item xs={12} className={styles['container']} >
                <Box className={styles['tracking-modal']} >
                    <Box className={styles['text']} >
                        <Box mb = {1} >{t("TRACK_YOUR_SHIPMENT")}</Box>
                        <form onSubmit={(e) => e.preventDefault()} className={styles['input-container']} >
                            <input className={styles['input-field']}
                                placeholder={t("SHIPMENT_NUMBER")}
                                type="number"
                                value={shipmentNum}
                                onChange={(e) => setShipmentNum(e.target.value)} />
                            <button className={styles['icon-container']} type="submit" onClick={() => {handleShipmentNumSubmit()}} >
                                <img alt = "" src={search} className={styles['icon']} />
                            </button>
                        </form>
                        {!isShipmentNumValid && <Box className = {styles['error-msg']} >{t("INVALID_SHIPMENT_NUMBER")}</Box>}
                    </Box>
                </Box>
            </Grid>
        </Container>
    )
}

export default withNamespaces()(HomeView)