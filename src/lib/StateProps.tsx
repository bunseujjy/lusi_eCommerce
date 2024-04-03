"use client";

import ProfilePage from "@/app/components/Dashboard/ProfilePage";
import { useState } from "react";

export const StateProps = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [path, setPath] = useState<boolean>(false);
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [drop, setDrop] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingName, setLoadingName] = useState<boolean>(false);
  const [loadingPassword, setLoadingPassword] = useState<boolean>(false);
  const [outSide, setOutSide] = useState<boolean>(false);
  const [closeCate, setCloseCate] = useState<boolean>(false);
  const [closeSort, setCloseSort] = useState<boolean>(false);
  const [closeStatus, setCloseStatus] = useState<boolean>(false);
  const [closePrice, setClosePrice] = useState<boolean>(false);
  const [closeSide, setCloseSide] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState();
  const [previewImg, setPreviewImg] = useState<string>();
  <ProfilePage profileImg={profileImg} />;
  return {
    isOpen,
    setIsOpen,
    navOpen,
    setNavOpen,
    modal,
    setModal,
    drop,
    setDrop,
    loading,
    setLoading,
    outSide,
    setOutSide,
    profileImg,
    setProfileImg,
    previewImg,
    setPreviewImg,
    loadingName,
    setLoadingName,
    loadingPassword,
    setLoadingPassword,
    closeCate,
    setCloseCate,
    closeSort,
    setCloseSort,
    closeStatus,
    setCloseStatus,
    closePrice,
    setClosePrice,
    path,
    setPath,
    closeSide,
    setCloseSide,
  };
};
