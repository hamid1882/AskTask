import React, {useEffect, useState} from 'react';
import Link from "next/link";

export default function home() {

  const handleLoggedIn = () => {
    const isLoggedIn =  localStorage.getItem("isLoggedIn");

    if(!isLoggedIn) {
      window.location.href = "./"
    }
  }

  useEffect(() => {
    handleLoggedIn();
  }, [])
  return (
    <div>
      Welcome home
    </div>
  )
}
