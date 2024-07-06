import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Index.module.scss";
import Navbar from "../../../Components/Navbar";
import Dashboard from "../../../Components/Dashboardleft";
import { useRouter } from "next/router";
import Modal from "../../../Components/Modal"; // Import the Modal component
import Sell from "../../../Components/Sell";

const Index = () => {
  const [castlesData, setCastlesData] = useState<any>([]);
  const [showModal, setShowModal] = useState<any>(false);
  const [showSell, setShowSell] = useState<any>(false);
  const [currentCastle, setCurrentCastle] = useState<any>(null);
  const router = useRouter();
  const { Skintypes } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/data/permalink/${Skintypes}`
        );
        console.log(response);
        setCastlesData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (Skintypes) {
      fetchData();
    }
  }, [Skintypes]);

  const handleEdit = (castle: any) => {
    setCurrentCastle(castle); 
    setShowModal(true);
  };
  
  const handleSell = (castle: any) => {
    setCurrentCastle(castle);
    setShowSell(true);
  };

  const handleInputChange = (field: any, value: any) => {
    setCurrentCastle((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://localhost:3000/data/castles/${currentCastle._id}`,
        {
          ...currentCastle,
          quantity: Number(currentCastle.quantity), // Ensure quantity is a number
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setCastlesData((prev: any) =>
        prev.map((castle: any) =>
          castle._id === currentCastle._id ? currentCastle : castle
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSellSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      
      // Send customer details
      await axios.post(
        "http://localhost:3000/customer/details",
        {
          name: currentCastle.customerName,
          skintype: currentCastle.skintype,
          quantity: Number(currentCastle.quantitySold), // Ensure quantitySold is a number
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Update the quantity in castles data
      const updatedCastle = {
        ...currentCastle,
        quantity: Number(currentCastle.quantity) - Number(currentCastle.quantitySold), // Ensure both quantities are numbers
      };

      await axios.put(
        `http://localhost:3000/data/castles/${currentCastle._id}`,
        updatedCastle,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCastlesData((prev: any) =>
        prev.map((castle: any) =>
          castle._id === currentCastle._id ? updatedCastle : castle
        )
      );
      setShowSell(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Dashboard />
        <div className={styles.cardContainer}>
          {castlesData.map((castle: any) => (
            <div key={castle._id} className={styles.card}>
              <img
                src={castle.photo[0]}
                alt={castle.skintype}
                className={styles.cardImage}
              />
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{castle.skintype}</h2>
                <p className={styles.cardText}>
                  <strong>Quantity:</strong> {castle.quantity}
                </p>
                <p className={styles.cardText}>
                  <strong>Castles:</strong> {castle.castles.join(", ")}
                </p>
                <p className={styles.cardText}>
                  <strong>Buff:</strong> {castle.buff.join(", ")}
                </p>
                <button onClick={() => handleEdit(castle)}>Edit</button>
                <button onClick={() => handleSell(castle)}>Sell</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        castle={currentCastle}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
      />
      <Sell
        show={showSell}
        onClose={() => setShowSell(false)}
        castle={currentCastle}
        handleInputChange={handleInputChange}
        handleSave={handleSellSave}
      />
    </>
  );
};

export default Index;
