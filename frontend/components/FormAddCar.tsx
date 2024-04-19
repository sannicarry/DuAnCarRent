"use client";
import { useEffect, useRef, useState } from "react";
import { useStore } from "./Store";
import { CustomButton } from ".";
import {
  fetchBrands,
  fetchCreatePhoto,
  fetchDeletePhoto,
  fetchUpdatePhoto,
  useClickOutside,
} from "@/utils";
import {
  BrandProps,
  CarProps,
  UploadPhoto,
  CreatePhoto,
  UpdatePhoto,
  DeletePhoto,
} from "@/types";

interface FormAddCarProps {
  car?: CarProps;
}

const FormAddCar = ({ car }: FormAddCarProps) => {
  const formRef = useRef<HTMLDivElement | null>(null);
  const {
    make,
    setMake,
    model,
    setModel,
    type,
    setType,
    gasoline,
    setGasoline,
    capacity,
    setCapacity,
    year,
    setYear,
    cityMpg,
    setCityMpg,
    fuel,
    setFuel,
    transmission,
    setTransmission,
    showAddNewCar,
    setShowAddNewCar,
    setError,
    setSuccess,
    token,
  } = useStore();

  const [listBrands, setListBrands] = useState<BrandProps[]>([]);
  const [brandId, setBrandId] = useState(0);
  const [brandName, setBrandName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [photos, setPhotos] = useState<UploadPhoto[]>([]);
  const [photosCreate, setPhotosCreate] = useState<CreatePhoto[]>([]);
  const [photosUpdate, setPhotosUpdate] = useState<UpdatePhoto[]>([]);
  const [photosDelete, setPhotosDelete] = useState<DeletePhoto[]>([]);

  const [countPhoto, setCountPhoto] = useState(4);

  console.log(car);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let url = "http://localhost:5290/api/car";
      let method = "POST";
      if (car?.carId != 0) {
        url += `/${car?.carId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          make,
          model,
          type,
          gasoline,
          capacity,
          year,
          cityMpg,
          fuel,
          transmission,
          brandId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        await cud(data.carId);
        setSuccess();
        setShowAddNewCar(false);
      } else {
        setError(data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (car?.carId == 0) {
      clearCar();
    }
  }, [car]);

  const clearCar = () => {
    setMake("");
    setModel("");
    setType("");
    setGasoline(0);
    setCapacity(0);
    setYear("");
    setFuel("");
    setCityMpg(0);
    setTransmission("");
  };

  useClickOutside(formRef, () => setShowAddNewCar(false));

  useEffect(() => {
    const getBrands = async () => {
      try {
        const result = await fetchBrands(
          {
            brandId,
            brandName,
            address,
            phone,
          },
          token
        );
        setListBrands(result);
      } catch (err) {
        console.error(err);
      }
    };
    getBrands();
  }, []);

  useEffect(() => {
    if (car && car?.carId !== 0) {
      setMake(car.make);
      setModel(car.model);
      setType(car.type);
      setCapacity(car.capacity);
      setGasoline(car.gasoline);
      setYear(car.year);
      setFuel(car.fuel);
      setTransmission(car.transmission);
      setCityMpg(car.cityMpg);
      setBrandId(car.brandId);
    }

    if (car && car?.carId !== 0) {
      // Tạo một mảng rỗng để lưu trữ các promise
      const filePromises: Promise<UploadPhoto>[] = [];

      car?.photos.forEach((photo) => {
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
          setPhotos(photos);
        })
        .catch((error) => {
          console.error("Error loading images:", error);
        });
    }
  }, [car?.carId]);

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
      const updatedSelectedFiles = [...photos];
      updatedSelectedFiles[index] = {
        file: files[0],
        photoId: photoId,
      };
      setPhotos(updatedSelectedFiles);
      if (car?.carId != 0 && photoId > 0) {
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div
        className="overflow-y-auto flex flex-col justify-center px-6 py-12 lg:px-8 absolute h-[80%] w-[50%] top-[100px] bg-gray-200 rounded-md border-2 border-gray-300"
        ref={formRef}
      >
        <div className="flex flex-col h-full">
          <h1 className="text-[082431] font-bold text-2xl opacity-80 text-center">
            {car?.carId != 0 ? "Edit Car" : "Add New Car"}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 py-6"
            method="POST"
          >
            <div className="flex flex-col">
              <div className="flex items-center">
                <label
                  htmlFor="make"
                  className="block text-base font-medium leading-6 text-gray-900 w-[20%]"
                >
                  Make
                </label>
                <div className="w-[80%]">
                  <select
                    id="make"
                    name="make"
                    value={brandId}
                    onChange={(e) => {
                      const selectedBrandId = parseInt(e.target.value);
                      const selectedBrand = listBrands.find(
                        (brand) => brand.brandId === selectedBrandId
                      );
                      if (selectedBrand) {
                        setBrandId(selectedBrandId);
                        setMake(selectedBrand.brandName);
                      }
                    }}
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">
                      {car?.carId != 0 ? `${car?.make}` : "Select a brand..."}
                    </option>
                    {car?.carId == 0 && (
                      <>
                        {listBrands.map((brand) => (
                          <option key={brand.brandId} value={brand.brandId}>
                            {brand.brandName}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <label
                  htmlFor="model"
                  className="block text-base font-medium leading-6 text-gray-900 w-[20%]"
                >
                  Model
                </label>
                <div className="w-[80%]">
                  <input
                    id="model"
                    name="model"
                    type="text"
                    autoComplete="model"
                    placeholder="Please type a new model ..."
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <label
                  htmlFor="type"
                  className="block text-base font-medium leading-6 text-gray-900 w-[20%]"
                >
                  Type
                </label>
                <div className="w-[80%]">
                  <input
                    id="type"
                    name="type"
                    type="text"
                    autoComplete="type"
                    placeholder="Please type a new type ..."
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <label
                  htmlFor="capacity"
                  className="block text-base font-medium leading-6 text-gray-900 w-[20%]"
                >
                  Capacity
                </label>
                <div className="w-[80%]">
                  <input
                    id="capacity"
                    name="capacity"
                    type="text"
                    autoComplete="capacity"
                    placeholder="Please type a new capacity ..."
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(parseInt(e.target.value))}
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <label
                  htmlFor="gasoline"
                  className="block text-base font-medium leading-6 text-gray-900 w-[20%]"
                >
                  Gasoline
                </label>
                <div className="w-[80%]">
                  <input
                    id="gasoline"
                    name="gasoline"
                    type="text"
                    autoComplete="gasoline"
                    placeholder="Please type a new gasoline ..."
                    required
                    value={gasoline}
                    onChange={(e) => setGasoline(parseInt(e.target.value))}
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <label
                  htmlFor="year"
                  className="block text-base font-medium leading-6 text-gray-900 w-[20%]"
                >
                  Year
                </label>
                <div className="w-[80%]">
                  <input
                    id="year"
                    name="year"
                    type="text"
                    autoComplete="year"
                    placeholder="Please type a new year ..."
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <label
                  htmlFor="fuel"
                  className="block text-base font-medium leading-6 text-gray-900 w-[20%]"
                >
                  Fuel
                </label>
                <div className="w-[80%]">
                  <input
                    id="fuel"
                    name="fuel"
                    type="text"
                    autoComplete="fuel"
                    placeholder="Please type a new fuel ..."
                    required
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <label
                  htmlFor="cityMpg"
                  className="block text-base font-medium leading-6 text-gray-900 w-[20%]"
                >
                  CityMpg
                </label>
                <div className="w-[80%]">
                  <input
                    id="cityMpg"
                    name="cityMpg"
                    type="text"
                    autoComplete="cityMpg"
                    placeholder="Please type a new cityMpg ..."
                    required
                    value={cityMpg}
                    onChange={(e) => setCityMpg(parseInt(e.target.value))}
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <label
                  htmlFor="transmission"
                  className="block text-base font-medium leading-6 text-gray-900 w-[20%]"
                >
                  Transmission
                </label>
                <div className="w-[80%]">
                  <input
                    id="transmission"
                    name="transmission"
                    type="text"
                    autoComplete="transmission"
                    placeholder="Please type a new transmission ..."
                    required
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <label
                  htmlFor="addImage"
                  className="block text-base font-medium leading-6 text-gray-900 w-[20%]"
                >
                  Image
                </label>
                <div className="w-[80%]">
                  {Array.from({ length: countPhoto }).map((_, index) => {
                    const currentPhoto = photos[index];
                    return (
                      <div
                        key={index}
                        className="relative inline-block w-24 h-24 mx-2"
                      >
                        <input
                          id={`photos${index}`}
                          name={`photos${index}`}
                          type="file"
                          accept="photos/*"
                          onChange={(e) =>
                            handleFileChange(
                              e,
                              currentPhoto?.photoId ?? 0,
                              car?.carId.toString() ?? "0",
                              1,
                              index
                            )
                          }
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {currentPhoto ? (
                          <>
                            <img
                              src={getPhotoUrl(currentPhoto) ?? ""}
                              alt={`Photo ${index + 1}`}
                              className="w-24 h-24 object-cover rounded-md border border-gray-400"
                            />
                            <button
                              className="absolute top-[-1px] right-[-1px] bg-gray-300 text-black rounded-full w-6 h-6 flex items-center justify-center"
                              onClick={(e) => {
                                handleRemovePhoto(
                                  e,
                                  car?.carId.toString() ?? "0",
                                  currentPhoto.photoId ?? 0,
                                  index
                                );
                              }}
                            >
                              X
                            </button>
                          </>
                        ) : (
                          <div className="w-24 h-24 border border-gray-400 flex items-center justify-center">
                            <img src="Plus.svg" alt="Add" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex">
              <CustomButton
                title={`${car?.carId != 0 ? "Save" : "Add"}`}
                btnType="submit"
                containerStyles="text-white text-white rounded-md bg-primary-blue bg-primary-blue w-full"
              />
            </div>
          </form>
        </div>
        <button
          className="absolute top-4 right-4 rounded-full bg-gray-300 hover:bg-gray-400 p-2"
          onClick={() => {
            setShowAddNewCar(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FormAddCar;
