"use client";
import React from "react";
import { useRouter } from "next/navigation";
// import '../styles/styles.css'
const LoginPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/Login");
    }
  }, [router]);

  return (
    <div className="index" style={{ margin: "0px" }}>
      Please refresh this page again for the login Screen
    </div>
  );
};

export default LoginPage;
