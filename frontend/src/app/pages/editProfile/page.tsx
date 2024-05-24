"use client";

import { CustomButton } from "@/components";
import { useStore } from "@/components/Store";
import { CreatePhoto, DeletePhoto, UpdatePhoto, UploadPhoto } from "@/types";
import {
  createUploadPhotoPromises,
  fetchCheckEmail,
  fetchCheckUsername,
  fetchCreatePhoto,
  fetchDeletePhoto,
  fetchUpdatePhoto,
  getPhotoUrl,
} from "@/utils";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SERVER_URL } from "@/constants";
import Profile from "@/views/profile/Profile";

const page = () => {
  const router = useRouter();

  const {
    success,
    setSuccess,
    token,
    userId,
    setUserId,
    user,
    setUser,
    photos,
    setPhotos,
    username,
    setUsername,
    email,
    setEmail,
    birthDate,
    setBirthDate,
    gender,
    setGender,
    isLocked,
    setIsLocked,
    address,
    setAddress,
    phone,
    setPhone,
    errorUsername,
    setErrorUsername,
    errorEmail,
    setErrorEmail,
    errorRegexEmail,
    setErrorRegexEmail,
    blurred,
    setBlurred,
  } = useStore();

  const [photosByUser, setPhotosByUser] = useState<UploadPhoto[]>([]);
  const [photosCreate, setPhotosCreate] = useState<CreatePhoto[]>([]);
  const [photosUpdate, setPhotosUpdate] = useState<UpdatePhoto[]>([]);
  const [photosDelete, setPhotosDelete] = useState<DeletePhoto[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const matchResult = birthDate.match(
        /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/
      );
      if (!matchResult) {
        throw new Error(
          "Invalid birthDate format. Please enter DD/MM/YYYY or DD-MM-YYYY."
        );
      }

      const [, day, month, year] = matchResult;
      const isobirthDate = `${day}-${month}-${year}`;

      let url = `${SERVER_URL}/api/user/${userId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          email,
          birthDate: isobirthDate,
          phone,
          address,
          gender,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        await cud(data.userId);
        setSuccess(!success);
        router.push("/", { scroll: true });
      } else {
        console.error("error update profile");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      if (user && user?.userId !== undefined) {
        setUserId(user.userId);
        setUsername(user.username);
        setEmail(user.email);
        setPhone(user.phone);
        setAddress(user.address);
        setBirthDate(user.birthDate);
        setGender(user.gender);
        setIsLocked(user.isLocked);
        setPhotos(user.photos);
        try {
          const baseURL = process.env.SERVER_URL;

          const uploadPromises = createUploadPhotoPromises(
            user?.photos,
            baseURL
          );
          const uploadedPhotos = await uploadPromises;
          setPhotosByUser(uploadedPhotos);
        } catch (error) {
          console.error("Error loading car images:", error);
        }
      }
    };
    fetchPhotos();
  }, [user]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    photoId: number,
    entityId: string,
    photoType: number,
    index: number
  ) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const updatedSelectedFiles = [...photosByUser];
      updatedSelectedFiles[index] = {
        file: files[0],
        photoId: photoId,
      };
      setPhotosByUser(updatedSelectedFiles);
      if (user?.userId != "" && photoId > 0) {
        if (photosUpdate[index]) {
          const updatedPhotos = [...photosUpdate];
          updatedPhotos[index] = {
            file: files[0],
            photoId: photoId,
            photoType: photoType,
            entityId: entityId,
          };
          setPhotosUpdate(updatedPhotos);
        } else {
          setPhotosUpdate((prevPhotosUpdate) => [
            ...prevPhotosUpdate,
            {
              file: files[0],
              photoId: photoId,
              photoType: photoType,
              entityId: entityId,
            },
          ]);
        }
      } else {
        if (photosCreate[index]) {
          const createdPhotos = [...photosCreate];
          createdPhotos[index] = {
            file: files[0],
            photoId: photoId,
            photoType: photoType,
            entityId: entityId,
          };
          setPhotosCreate(createdPhotos);
        } else {
          setPhotosCreate((prevPhotosCreate) => [
            ...prevPhotosCreate,
            {
              file: files[0],
              photoId: photoId,
              photoType: photoType,
              entityId: entityId,
            },
          ]);
        }
      }
    }
  };

  const handleRemovePhoto = async (
    event: React.MouseEvent<HTMLButtonElement>,
    entityId: string,
    photoId: number,
    index: number
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setPhotosByUser((prePhoto) =>
      prePhoto.filter((photo) => photo.photoId !== photoId)
    );

    setPhotosCreate((prevPhotosCreate) =>
      prevPhotosCreate.filter((photo) => photo.photoId !== photoId)
    );

    setPhotosUpdate((prevPhotosUpdate) =>
      prevPhotosUpdate.filter((photo) => photo.photoId !== photoId)
    );

    if (photoId > 0) {
      setPhotosDelete((prevPhotosDelete) => [
        ...prevPhotosDelete,
        {
          entityId: entityId,
          photoId: photoId,
        },
      ]);
    }
  };

  const cud = async (entityId: string) => {
    if (photosCreate.length > 0) {
      const updatedPhotosCreate = photosCreate.map((photo) => {
        return {
          ...photo,
          entityId: entityId,
        };
      });
      await fetchCreatePhoto(updatedPhotosCreate, token);
    }
    if (photosUpdate.length > 0) {
      await fetchUpdatePhoto(photosUpdate, token);
    }
    if (photosDelete.length > 0) {
      await fetchDeletePhoto(photosDelete, token);
    }
  };

  //Check username
  useEffect(() => {
    const fetchData = async () => {
      if (username && user?.username && username !== user?.username) {
        try {
          const errUser = await fetchCheckUsername(username, token);
          setErrorUsername(errUser);
        } catch (error) {
          console.error("Error checking username:", error);
        }
      }
    };

    fetchData();
  }, [username, user?.username]);
  //Check email
  useEffect(() => {
    const fetchData = async () => {
      if (email && user?.email && email !== user?.email) {
        try {
          setErrorRegexEmail(false);
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const isValidEmail = emailRegex.test(email);

          if (!isValidEmail) {
            setErrorRegexEmail(true);
            return;
          }

          const errEmail = await fetchCheckEmail(email, token);
          setErrorEmail(errEmail);
        } catch (error) {
          console.error("Error checking Email:", error);
        }
      }
    };

    fetchData();
  }, [email, user?.email]);

  return (
    <div className="content">
      <Profile />
    </div>
  );
};

export default page;
