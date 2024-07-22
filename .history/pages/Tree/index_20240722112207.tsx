"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import styles from "./index.module.scss";
import Navbar from "../../Components/Navbar";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  leftChild?: string;
  rightChild?: string;
  coins?: number;
  referralCode?: string;
}

interface TreeNodeProps {
  node: User;
  left: TreeNodeProps | null;
  right: TreeNodeProps | null;
  onClick: (node: User) => void;
  onAddChild: (parentId: string, selectedOption: "left" | "right") => void;
  refreshKey: number;
  userRole: string | null;
}

const createBinaryTree = (users: User[]): Map<string, TreeNodeProps> => {
  const userMap = new Map<string, any>();

  users.forEach((user) => {
    userMap.set(user._id, { node: user, left: null, right: null });
  });

  users.forEach((user) => {
    const node = userMap.get(user._id);
    if (user.leftChild && userMap.has(user.leftChild)) {
      node!.left = userMap.get(user.leftChild)!;
    }
    if (user.rightChild && userMap.has(user.rightChild)) {
      node!.right = userMap.get(user.rightChild)!;
    }
  });

  return userMap;
};

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  left,
  right,
  onClick,
  onAddChild,
  refreshKey,
  userRole,
}) => {
  const [showCoinsPopup, setShowCoinsPopup] = useState(false);
  const [newCoins, setNewCoins] = useState("");
  const [updatingCoins, setUpdatingCoins] = useState(false);

  const handleCoinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCoins(e.target.value);
  };

  const handleUpdateCoins = async () => {
    try {
      setUpdatingCoins(true);
      const token = localStorage.getItem("accessToken");
      const apiEndpoint = `https://www.referback.trollsufficient.com/admin/distribute-coins/${node.referralCode}`;

      const response = await axios.post(
        apiEndpoint,
        { coins: newCoins },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Coins updated successfully:", response.data);
      setNewCoins("");
      setShowCoinsPopup(false);
      setUpdatingCoins(false);

      window.location.reload();
    } catch (error) {
      console.error("Error updating coins:", error);
      setUpdatingCoins(false);
    }
  };

  const handleAddChild = (selectedOption: "left" | "right") => {
    onAddChild(node._id, selectedOption);
  };

  return (
    <>
      <div className={styles.node} onClick={() => onClick(node)}>
        <div className={styles.icon}>
          <i className="fas fa-user"></i>
        </div>
        <div className={styles.name}>{node.name}</div>
        <div className={styles.email}>{node.email}</div>
        <div className={styles.id}>Coins: {node.coins}</div>
        <div className={styles.id}>Referral Code: {node.referralCode}</div>

        {userRole === "admin" && !left && (
          <div className={styles.addChild}>
            <button
              className={styles.addChildButton}
              onClick={() => handleAddChild("left")}
            >
              <i className="fas fa-plus"></i> Add Left Child
            </button>
          </div>
        )}

        {userRole === "admin" && !right && (
          <div className={styles.addChild}>
            <button
              className={styles.addChildButton}
              onClick={() => handleAddChild("right")}
            >
              <i className="fas fa-plus"></i> Add Right Child
            </button>
          </div>
        )}

        {left && (
          <div className={styles.lineWrapper}>
            <div className={`${styles.line} ${styles.lineLeft}`}></div>
          </div>
        )}

        {right && (
          <div className={styles.lineWrapper}>
            <div className={`${styles.line} ${styles.lineRight}`}></div>
          </div>
        )}
      </div>

      {userRole === "admin" && !showCoinsPopup && (
        <div className={styles.sendCoinnew}>
          <button
            className={`${styles.sendCoinsButton} ${
              updatingCoins ? styles.updating : ""
            }`}
            onClick={() => setShowCoinsPopup(true)}
          >
            Send Coins
          </button>
        </div>
      )}

      <div className={styles.sendCoins}>
        {showCoinsPopup && (
          <div className={styles.coinsPopup}>
            <input
              type="number"
              placeholder="Enter Coins"
              value={newCoins}
              onChange={handleCoinsChange}
            />
            <button
              className={styles.updateCoinsButton}
              onClick={handleUpdateCoins}
            >
              Update Coins
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const Index: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userMap, setUserMap] = useState<Map<string, TreeNodeProps> | null>(
    null
  );
  const [currentNode, setCurrentNode] = useState<User | null>(null);
  const [viewAll, setViewAll] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [parentId, setParentId] = useState("");
  const [selectedOption, setSelectedOption] = useState<"left" | "right">(
    "left"
  );
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://www.referback.trollsufficient.com/admin/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUsers(response.data);
        const map = createBinaryTree(response.data);
        setUserMap(map);

        if (response.data.length > 0) {
          setCurrentNode(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchUserRole = () => {
      const role = localStorage.getItem("role");
      setUserRole(role);
    };

    fetchUsers();
    fetchUserRole();
  }, [refreshKey]);

  const handleNodeClick = (node: User) => {
    setCurrentNode(node);
  };

  const handleAddChild = async (
    parentId: string,
    selectedOption: "left" | "right"
  ) => {
    try {
      setParentId(parentId);
      setSelectedOption(selectedOption);
      setShowForm(true);
    } catch (error) {
      console.error("Error handling add child:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const apiEndpoint =
        selectedOption === "left"
          ? `https://www.referback.trollsufficient.com/admin/add-left-child/${parentId}`
          : `https://www.referback.trollsufficient.com/add-right-child/${parentId}`;

      const token = localStorage.getItem("accessToken");

      const response = await axios.put(apiEndpoint, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to add child");
      }

      console.log("Child added successfully:", response.data);
      setSuccess(true);

      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error: any) {
      console.error("Error adding child:", error);
      setError(error);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    setError(null);
    setSuccess(false);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.main}>
        <h1 className={styles.title}>Referback User Tree</h1>

        {currentNode && userMap && (
          <div className={styles.tree}>
            <TreeNode
              node={userMap.get(currentNode._id)!.node}
              left={userMap.get(currentNode._id)!.left}
              right={userMap.get(currentNode._id)!.right}
              onClick={handleNodeClick}
              onAddChild={handleAddChild}
              refreshKey={refreshKey}
              userRole={userRole}
            />
          </div>
        )}

        {showForm && (
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h2>Add {selectedOption === "left" ? "Left" : "Right"} Child</h2>
              {error && <p className={styles.error}>{error.message}</p>}
              {success && (
                <p className={styles.success}>Child added successfully!</p>
              )}
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit">Add Child</button>
              <button type="button" onClick={handleCloseForm}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
      <ThreeDCardDemo />
    </div>
  );
};

export default Index;
