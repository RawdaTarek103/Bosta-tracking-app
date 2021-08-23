import React from 'react';

import styles from './layout.module.css';
import {Header} from '../../components/Header/Header';

const Layout = (props) => {

    // sideDrawerClosedHandler = () => {
    //     this.setState({ showSideDrawer: false });
    // }

    // sideDrawerToggleHandler = () => {
    //     this.setState((prevState) => {
    //         return { showSideDrawer: !prevState.showSideDrawer };
    //     });
    // }

    return (
        <div >
            <Header  />
           
            <main style ={{paddingTop:"64px"}} className={styles.Content}>
                {props.children}
            </main>
        </div>
    )
}


export default Layout;