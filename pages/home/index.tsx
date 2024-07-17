import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import Navbar from '../../Components/Navbar';
import Dashboardleft from '../../Components/Dashboardleft';
import style from './index.module.scss'
const Index = () => {
  const router = useRouter(); // Initialize useRouter hook

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');

    // If token does not exist, redirect to login page
    if (!token) {
      router.push('/login'); // Redirect to login page using router.push
    }
  }, [router]); // useEffect depends on router

  return (
    <div>
      <Navbar />
      <div className={style.content}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam qui velit ab sint eaque dolore pariatur, accusamus excepturi reprehenderit nulla laudantium? Quasi id quia officiis voluptate suscipit repudiandae explicabo molestias minima ea, quas perspiciatis et vel eos debitis nemo sint eligendi assumenda atque odit neque rem quae praesentium? Ipsum impedit reprehenderit repudiandae molestiae itaque illum reiciendis neque saepe placeat voluptatem quos consequatur blanditiis asperiores veritatis explicabo, tenetur, deserunt beatae delectus consequuntur nemo odit nam officia! Suscipit illum, id labore ducimus sapiente dolor iusto ad molestiae aspernatur amet, aliquid consequuntur aut minima quibusdam soluta quos iure beatae earum nobis veritatis explicabo nemo tempora quo! Fuga qui excepturi assumenda in error aliquid autem provident fugit voluptate quas id quo eum totam veniam, perspiciatis impedit ipsam mollitia doloribus labore. Ex eligendi illum aliquid aperiam ratione dolorum error repellendus, ad consequuntur? Ipsam nam rem iure odit tempore iste rerum possimus, sed mollitia quo sint vitae, quaerat distinctio sunt. Soluta est tempora ullam pariatur, possimus voluptates mollitia amet minus voluptate ipsum repellat magnam doloremque iste nesciunt sunt provident nisi incidunt sapiente iure rem placeat molestias? Mollitia, quisquam architecto asperiores voluptatem eveniet impedit, repellat incidunt consectetur, ut ipsa nemo autem recusandae ipsam natus sapiente illo inventore!
      </div>
      {/* <Dashboardleft /> */}
    </div>
  );
};

export default Index;
