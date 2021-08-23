import React, { useEffect, useState } from 'react'
import { Container, Grid, Box } from '@material-ui/core'
import { withNamespaces } from 'react-i18next';
import axios from 'axios'
import { ShipmentProgress } from '../../components/ShipmentProgress/ShipmentProgress'
import { ShipmentDetails } from '../../components/ShipmentDetails/ShipmentDetails'
import { DeliveryAddress } from '../../components/DeliveryAddress/DeliveryAddress'
import { ShipmentReport } from '../../components/ShipmentReport/ShipmentReport';
import { getLastUpdateFormated, getPromisedDateFormated } from '../../utility'
import { states } from '../../constants'
import qs from 'qs'
const ShipmentView = withNamespaces()(({ t, history, location }) => {

    const [shipment, setShipment] = useState({})

    const isValid = () => {
        let valid = true
        if ("DELIVERED".localeCompare(shipment.CurrentStatus.state) === 0) {
            valid = true
        } else {
            let occurrences = 0
            for (let i = 0; i < shipment.TransitEvents.length; i++) {
                if ("WAITING_FOR_CUSTOMER_ACTION".localeCompare(shipment.TransitEvents[i].state) === 0) {
                    occurrences++;
                    if (occurrences === 3) {
                        valid = false
                        break;
                    }
                }
            }
        }
        return valid
    }
    const getReason = () => {
        let reason = null
        if ("DELIVERED".localeCompare(shipment.CurrentStatus.state) === 0) {
            return reason
        } else {
            for (let i = 0; i < shipment.TransitEvents.length; i++) {
                if ("WAITING_FOR_CUSTOMER_ACTION".localeCompare(shipment.TransitEvents[i].state) === 0) {
                    reason = shipment.TransitEvents[i].reason??null
                }
            }
        }
        return reason
    }
    useEffect(() => {
        if(qs.parse(location.search, { ignoreQueryPrefix: true }).track_num){
            let shipmentNum = qs.parse(location.search, { ignoreQueryPrefix: true }).track_num
            if(location.state?.shipment){
                setShipment(location.state.shipment)
            }else{
                const handleShipmentNumSubmit = async () => {
                    try {
                        let response = await axios.get(`https://tracking.bosta.co/shipments/track/${shipmentNum}`)
                        setShipment(response.data)
                    } catch (error) {
                        history.push("/")
                    }
                }
                handleShipmentNumSubmit();
            }
        }
    }, [])
    return (
        JSON.stringify(shipment) !== "{}" ?
            <div>
                <Container maxWidth="lg" >
                    <ShipmentProgress
                        shipmentNum={shipment.TrackingNumber}
                        shipmentStatus={t(shipment.CurrentStatus.state)}
                        promisedDate={getPromisedDateFormated(t, shipment.promisedDate) ?? getPromisedDateFormated(t, "2021-09-07T12:50:20.941Z")}
                        lastUpdate={getLastUpdateFormated(t, shipment.CurrentStatus.timestamp)}
                        isValid={isValid()}
                        active={states[shipment.CurrentStatus.state]}
                        reason = {()=>getReason()}
                    />
                    <Grid container spacing={3} >
                        <Grid item xs={12} md={8} >
                            <ShipmentDetails shipmentDetails={shipment.TransitEvents} />
                        </Grid>
                        <Grid item xs={12} md={4} >
                            <Box>
                                <DeliveryAddress />
                            </Box>
                            <Box mt={1.5}>
                                <ShipmentReport />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            : ""
    )
})

export default ShipmentView