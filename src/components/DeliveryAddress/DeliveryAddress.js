import React from 'react';
import styles from './deliveryAddress.module.css'
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types'

export const DeliveryAddress = withNamespaces()(({ t, address }) => {
    return (
        <div className={styles['container']}>
            <div className={styles['table-title']} >{t("DELIVERY_ADDRESS")}</div>
            <div className={styles['address-container']}>{address}</div>
        </div>
    )
})

DeliveryAddress.propTypes = {
    address: PropTypes.string,  
};

DeliveryAddress.defaultProps = {
    address:"امبابة شارع طلعت حرب مدينة العمال بجزار البرنس منزل 17 بلوك 33 Cairo"
};
