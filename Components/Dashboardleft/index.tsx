import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserMinus, faCog, faHome } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';
import Link from 'next/link';

const Dashboard = () => {
  const [route,setRoute]=useState([])
  return (
    <div className={styles.sidebar}>
      <div className={styles.topSection}>
        <h2>Dashboard</h2>
      </div>
      <ul className={styles.menu}>
        <li>
          <FontAwesomeIcon icon={faHome} />
          {/* <Link href={"/Home"}> */}
           Home
           {/* </Link> */}
        </li>
        <li>
          <FontAwesomeIcon icon={faUserPlus} /> <Link style={{color:"white",textDecoration:"none"}} href={"/Adduser"}>Add User </Link>
         </li>
        <li>
          <FontAwesomeIcon icon={faUserMinus} /> <Link style={{color:"white",textDecoration:"none"}} href={"/Tree"}>All User </Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faCog} /> <Link style={{color:"white",textDecoration:"none"}} href={"/Graphs"}>Graphs </Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faUserPlus} /> Item 1
        </li>
        <li>
          <FontAwesomeIcon icon={faUserMinus} /> Item 2
        </li>
        <li>
          <FontAwesomeIcon icon={faCog} /> Item 3
        </li>
        <li>
          <FontAwesomeIcon icon={faUserPlus} /> Item 4
        </li>
        <li>
          <FontAwesomeIcon icon={faUserMinus} /> Item 5
        </li>
        <li>
          <FontAwesomeIcon icon={faCog} /> Item 6
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
