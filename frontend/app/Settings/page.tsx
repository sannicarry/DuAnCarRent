"use client";

import { CustomButton } from "@/components";
import { useStore } from "@/components/Store";
import {
  CreatePhoto,
  DeletePhoto,
  PhotoProps,
  UpdatePhoto,
  UploadPhoto,
  UserProps,
} from "@/types";
import {
  fetchCreatePhoto,
  fetchDeletePhoto,
  fetchUpdatePhoto,
  fetchUser,
} from "@/utils";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
  const router = useRouter();

  const {
    success,
    setSuccess,
    token,
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
  } = useStore();

  const [userId, setUserId] = useState("");

  const [user, setUser] = useState<UserProps>();

  const [photos, setPhotos] = useState<PhotoProps[]>([]);

  const [photosByUser, setPhotosByUser] = useState<UploadPhoto[]>([]);
  const [photosCreate, setPhotosCreate] = useState<CreatePhoto[]>([]);
  const [photosUpdate, setPhotosUpdate] = useState<UpdatePhoto[]>([]);
  const [photosDelete, setPhotosDelete] = useState<DeletePhoto[]>([]);

  const getUser = async () => {
    try {
      const result = await fetchUser(
        {
          userId,
          username,
          email,
          phone,
          address,
          birthDate,
          gender,
          isLocked,
          photos,
        },
        token
      );
      setUser(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let url = `http://localhost:5290/api/car/${userId}`;
      console.log(url);
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          email,
          birthDate,
          phone,
          address,
          gender,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        await cud(data.carId);
        setSuccess();
        router.push("/", { scroll: true });
      } else {
        console.error("error update profile");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (token != "") {
      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (user && user?.userId !== "") {
      setUserId(user.userId);
      setUsername(user.username);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
      setBirthDate(user.birthDate);
      setGender(user.gender);
      setIsLocked(user.isLocked);
      setPhotos(user.photos);

      const filePromises: Promise<UploadPhoto>[] = [];

      user?.photos.forEach((photo) => {
        const baseURL = process.env.SERVER_URL || "http://localhost:5290";
        const photoUrl = `${baseURL}/${photo.photoUrl}`;

        filePromises.push(
          new Promise<UploadPhoto>(async (resolve, reject) => {
            try {
              const response = await fetch(photoUrl);
              const blob = await response.blob();
              const UploadPhoto: UploadPhoto = {
                file: new File([blob], `image${Date.now()}.jpg`, {
                  type: blob.type,
                }),
                photoId: photo.photoId,
              };
              resolve(UploadPhoto);
            } catch (error) {
              reject(error);
            }
          })
        );
      });

      Promise.all(filePromises)
        .then((photos) => {
          setPhotosByUser(photos);
        })
        .catch((error) => {
          console.error("Error loading images:", error);
        });
    }
  }, [user?.userId]);

  const getPhotoUrl = (photo: UploadPhoto) => {
    if (photo && photo.file) {
      return URL.createObjectURL(photo.file);
    }
    return null;
  };

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

    setPhotos((prePhoto) =>
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

  return (
    <div className="content">
      <div className="border rounded-md h-[80vh] py-6 px-6 bg-slate-100 flex flex-col gap-16">
        <div className="flex justify-center">
          <h1 className="font-bold text-3xl text-[#555555] uppercase">
            Your Profile
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          method="PUT"
          className="flex flex-col gap-16"
        >
          <div className="grid grid-cols-4 gap-5">
            <div className="col-span-3 flex flex-col gap-10">
              <div className="flex gap-16 items-center">
                <div className="flex gap-4 items-center w-full">
                  <label
                    htmlFor="username"
                    className="font-bold text-lg uppercase text-[#808080] w-[30%]"
                  >
                    Username
                  </label>
                  <div className="w-[70%]">
                    <input
                      className="rounded-md border border-blue-300 px-2 h-10 w-full"
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      placeholder="Please type a new username ..."
                      required
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center w-full">
                  <label
                    htmlFor="email"
                    className="font-bold text-lg uppercase text-[#808080] w-[30%]"
                  >
                    Email
                  </label>
                  <div className="w-[70%]">
                    <input
                      className="rounded-md border border-blue-300 px-2 h-10 w-full"
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="email"
                      placeholder="Please type a new email ..."
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-16 items-center">
                <div className="flex gap-4 items-center w-full">
                  <label
                    htmlFor="phone"
                    className="font-bold text-lg uppercase text-[#808080] w-[30%]"
                  >
                    Phone
                  </label>
                  <div className="w-[70%]">
                    <input
                      className="rounded-md border border-blue-300 px-2 h-10 w-full"
                      id="phone"
                      name="phone"
                      type="text"
                      autoComplete="phone"
                      placeholder="Please type a new phone ..."
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center w-full">
                  <label
                    htmlFor="address"
                    className="font-bold text-lg uppercase text-[#808080] w-[30%]"
                  >
                    Address
                  </label>
                  <div className="w-[70%]">
                    <input
                      className="rounded-md border border-blue-300 px-2 h-10 w-full"
                      id="address"
                      name="address"
                      type="text"
                      autoComplete="address"
                      placeholder="Please type a new address ..."
                      required
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-16 items-center">
                <div className="flex gap-4 items-center w-full">
                  <label
                    htmlFor="birthDate"
                    className="font-bold text-lg uppercase text-[#808080] w-[30%]"
                  >
                    birthDate
                  </label>
                  <div className="w-[70%]">
                    <input
                      className="rounded-md border border-blue-300 px-2 h-10 w-full"
                      id="birthDate"
                      name="birthDate"
                      type="text"
                      autoComplete="birthDate"
                      placeholder="Please type a new birthDate ..."
                      required
                      value={birthDate}
                      onChange={(e) => {
                        setBirthDate(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center w-full">
                  <span className="font-bold text-lg uppercase text-[#808080] w-[30%]">
                    Gender
                  </span>
                  <div className="flex gap-2 w-[70%]">
                    <div className="flex w-[50%] rounded-md justify-between border border-slate-300 px-2 py-1">
                      <label htmlFor="femaleGender">Female</label>
                      <input
                        id="femaleGender"
                        name="gender"
                        type="radio"
                        autoComplete="off"
                        required
                        checked={!gender}
                        onChange={() => setGender(false)}
                        className=""
                      />
                    </div>
                    <div className="flex w-[50%] rounded-md justify-between border border-slate-300 px-2 py-1">
                      <label htmlFor="maleGender">Male</label>
                      <input
                        id="maleGender"
                        name="gender"
                        type="radio"
                        autoComplete="off"
                        required
                        checked={!gender}
                        onChange={() => setGender(true)}
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex flex-col gap-10 items-center h-full">
                <label
                  htmlFor="addImage"
                  className="font-bold text-lg uppercase text-[#808080]"
                >
                  Photo
                </label>
                <div className="h-32">
                  {Array.from({ length: 1 }).map((_, index) => {
                    const currentPhoto = photosByUser[index];
                    return (
                      <div
                        key={index}
                        className="relative h-full inline-block w-full"
                      >
                        <div className=" border border-black rounded-md hover:bg-slate-500 h-full overflow-hidden">
                          <input
                            id={`photos${index}`}
                            name={`photos${index}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(
                                e,
                                currentPhoto?.photoId ?? 0,
                                user?.userId ?? "",
                                1,
                                index
                              )
                            }
                            className="absolute inset-0 w-32 h-32 opacity-0 cursor-pointer "
                          />
                          {currentPhoto ? (
                            <>
                              <img
                                src={getPhotoUrl(currentPhoto) ?? ""}
                                alt={`Photo ${index + 1}`}
                                className="w-32 h-32 object-cover border-gray-400"
                              />
                            </>
                          ) : (
                            <div className="w-32 h-32 border-gray-400 flex items-center justify-center">
                              <img src="userPhoto.png" alt="userPhoto" />
                            </div>
                          )}
                        </div>
                        {currentPhoto && (
                          <>
                            <button
                              className="absolute top-[-1px] right-[-1px] bg-gray-300 text-black rounded-full w-6 h-6 flex items-center justify-center"
                              onClick={(e) => {
                                handleRemovePhoto(
                                  e,
                                  user?.userId ?? "",
                                  currentPhoto.photoId ?? 0,
                                  index
                                );
                              }}
                            >
                              X
                            </button>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-end">
            <div className="flex gap-5 w-[30%]">
              <Link href="/" className="w-[50%] ">
                <CustomButton
                  title={`Back Home`}
                  textStyles={`font-bold text-lg`}
                  containerStyles="text-blue-500 border border-black rounded-md bg-white hover:bg-blue-500 hover:text-white"
                />
              </Link>

              <CustomButton
                title={`Save`}
                btnType="submit"
                textStyles={`font-bold text-lg`}
                containerStyles="w-[50%] text-white rounded-md border border-black bg-primary-blue hover:bg-white hover:text-blue-500"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
