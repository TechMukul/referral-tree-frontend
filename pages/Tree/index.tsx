import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Navbar from '../../Components/Navbar';
import Dashboard from '../../Components/Dashboardleft';
// import '@fortawesome/fontawesome-free/css/all.min.css';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface TreeNodeProps {
  user: User;
  left: TreeNodeProps | null;
  right: TreeNodeProps | null;
}

const createBinaryTree = (users: User[]): TreeNodeProps | null => {
  if (users.length === 0) return null;

  let index = 0;
  const root: TreeNodeProps = { user: users[index++], left: null, right: null };
  const queue: TreeNodeProps[] = [root];

  while (index < users.length) {
    const currentNode = queue.shift() as TreeNodeProps;

    if (index < users.length) {
      currentNode.left = { user: users[index++], left: null, right: null };
      queue.push(currentNode.left);
    }

    if (index < users.length) {
      currentNode.right = { user: users[index++], left: null, right: null };
      queue.push(currentNode.right);
    }
  }

  return root;
};

const TreeNode = ({ node }: { node: TreeNodeProps | null }) => {
  if (!node) return null;

  return (
    <div className={styles.node}>
      <div className={styles.icon}>
        <i className="fas fa-user"></i>
      </div>
      <div className={styles.name}>{node.user.name}</div>
      <div className={styles.email}>{node.user.email}</div>
      <div className={styles.children}>
        {node.left && (
          <>
            {/* <div className={`${styles.line} ${styles.linehorizontal} ${styles.lineleft}`}></div> */}
            <div className={`${styles.line} ${styles.linevertical}`}></div>
            <TreeNode node={node.left} />
          </>
        )}
        {node.right && (
          <>
            {/* <div className={`${styles.line} ${styles.linehorizontal} ${styles.lineright}`}></div> */}
            <div className={`${styles.line} ${styles.linevertical}`}></div>
            <TreeNode node={node.right} />
          </>
        )}
      </div>
    </div>
  );
};

const Index = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [tree, setTree] = useState<TreeNodeProps | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3000/auth/all');
      const data: User[] = await response.json();
      const sortedUsers = data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      setUsers(sortedUsers);
      setTree(createBinaryTree(sortedUsers));
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', height: 'auto' }}>
        <Dashboard />
        <div className={styles.container}>
          <div className={styles.tree}>
            <div className={styles.admin}>
              <div className={styles.icon}>
                <i className="fas fa-user-shield"></i>
              </div>
              <div className={styles.name}>Admin</div>
            </div>
            {tree && <TreeNode node={tree} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
