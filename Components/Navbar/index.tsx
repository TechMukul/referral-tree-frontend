"use client"
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss'; // Import SASS module
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [NavComponent, setNavComponent] = useState<any>(null);

  useEffect(() => {
    const loadNavComponent = async () => {
      const { Nav } = await import('react-bootstrap');
      return Nav;
    };

    loadNavComponent().then(component => setNavComponent(component));
  }, []);

  return (
    <div className={styles.container}>
      {NavComponent && (
        <NavComponent className={styles.navbar} activeKey="/home">
          {/* <div className={styles.logo}>
            <Image alt='logo' width={100} height={50} src={"https://cdn.iconscout.com/icon/premium/png-256-thumb/demo-4-890074.png"} />
          </div> */}
          <div className={styles.navlinksContainer}>
            <NavComponent.Item>
              <NavComponent.Link href="/home" className={styles.navlinks}>
                Home
              </NavComponent.Link>
            </NavComponent.Item>
            <NavComponent.Item>
              <NavComponent.Link eventKey="link-1" className={styles.navlinks}>
                About
              </NavComponent.Link>
            </NavComponent.Item>
            <NavComponent.Item>
              <NavComponent.Link eventKey="link-2"  >
                <Link href={"/Contact"} className={styles.navlinks}>
                Contact
                </Link>
              </NavComponent.Link>
            </NavComponent.Item>
            <NavComponent.Item>
              <NavComponent.Link eventKey="disabled">
                <Link href={"/pages/Login"} className={styles.navlinks}>
                Login
                </Link>
              </NavComponent.Link>
            </NavComponent.Item>
          </div>
        </NavComponent>
      )}
    </div>
  );
};

export default Navbar;
