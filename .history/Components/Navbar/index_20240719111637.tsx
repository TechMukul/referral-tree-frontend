import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import style from './index.module.scss'; // Adjust the module path accordingly

const Navbar = (coins) => {
  const [NavComponent, setNavComponent] = useState<any>(null);
  const [userName, setUserName] = useState<string>('');
  const [userCoins, setUserCoins] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const loadNavComponent = async () => {
      const { Nav } = await import('react-bootstrap');
      setNavComponent(Nav);
    };

    loadNavComponent();

    // Fetch user's name from query parameters or local storage
    if (typeof window !== 'undefined') { // Check if window is defined (client-side)
      const { name } = router.query;
      if (name && typeof name === 'string') {
        setUserName(name);
        localStorage.setItem('userName', name); // Store the user's name in local storage
      } else {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
          setUserName(storedName);
        }
      }

      const storedCoins = localStorage.getItem('userCoins');
      if (storedCoins) {
        setUserCoins(storedCoins);
      }

      // Function to fetch updated user coins
      const fetchUserCoins = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await axios.get('https://www.referback.trollsufficient.com/user/coins', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { coins } = response.data;
          setUserCoins(coins.toString());
          localStorage.setItem('userCoins', coins.toString());
        } catch (error) {
          console.error('Error fetching user coins:', error);
        }
      };

      // Fetch initial coins and start interval to update every 1 second
      fetchUserCoins();
      const intervalId = setInterval(fetchUserCoins, 1000);

      // Cleanup function to clear interval
      return () => clearInterval(intervalId);
    }
  }, [router.query]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName'); // Remove the user's name from local storage
    localStorage.removeItem('userCoins'); // Remove the user's coins from local storage
    router.push('/');
  };
console.log(coins.coins)
  return (
    <>
      <div className={style.navbar}>
        <div className={style.username}>{userName ? `Hi ${userName}` : 'Welcome User'}</div>
        {userCoins && <div className={style.coins}>{`Coins: ${coins.coins}`}</div>}
        <div className={style.navlinksContainer}>
          <Link href="/home" className={style.navlinks}>
            Home
          </Link>
          {NavComponent && (
            <NavComponent.Item>
              <NavComponent.Link eventKey="disabled" className={style.navlinks}>
                <Link href="/Tree">All Users</Link>
              </NavComponent.Link>
              <NavComponent.Link eventKey="disabled" className={style.navlinks}>
                <Link href="/Message">Messages</Link>
              </NavComponent.Link>
            </NavComponent.Item>
          )}
          <Button variant="outline-light" onClick={handleLogout} className={style.navButton}>
            <FontAwesomeIcon icon={faSignOutAlt} className={style.navIcon} />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
