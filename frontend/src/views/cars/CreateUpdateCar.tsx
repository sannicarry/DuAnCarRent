"use client";
import { useEffect, useRef, useState } from "react";
import {
  createUploadPhotoPromises,
  fetchBrands,
  fetchCreatePhoto,
  fetchDeletePhoto,
  fetchUpdatePhoto,
  getPhotoUrl,
} from "@/utils";
import {
  BrandProps,
  UploadPhoto,
  CreatePhoto,
  UpdatePhoto,
  DeletePhoto,
  CarProps,
} from "@/types";
import { useStore } from "@/components/Store";
import { CustomButton } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const CreateUpdateCar = ({ car }: { car: CarProps }) => {
  const router = useRouter();

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
    setError,
    setSuccess,
    token,
    brandId,
    setBrandId,
    brandName,
    address,
    phone,
  } = useStore();

  const [listBrands, setListBrands] = useState<BrandProps[]>([]);

  const [photos, setPhotos] = useState<UploadPhoto[]>([]);
  const [photosCreate, setPhotosCreate] = useState<CreatePhoto[]>([]);
  const [photosUpdate, setPhotosUpdate] = useState<UpdatePhoto[]>([]);
  const [photosDelete, setPhotosDelete] = useState<DeletePhoto[]>([]);

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
        setSuccess(true);
        router.push("/pages/car", { scroll: false });
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
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
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

      if (car && car?.carId !== undefined) {
        try {
          const baseURL = process.env.SERVER_URL || "http://localhost:5290";

          const uploadPromises = createUploadPhotoPromises(
            car?.photos,
            baseURL
          );
          const uploadedPhotos = await uploadPromises;
          setPhotos(uploadedPhotos);
        } catch (error) {
          console.error("Error loading car images:", error);
        }
      }
    };

    fetchData();
  }, [car]);

  //CreatedPhotos copy từ photos => duyệt những phần tử có photoId = 0
  useEffect(() => {
    const newPhotosCreate = photos.map((photo, index) => ({
      file: photo.file,
      photoId: photo.photoId,
      photoType: 1,
      entityId: car.carId.toString(),
    }));

    setPhotosCreate(newPhotosCreate);
  }, [photos]);

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
        const photoSelect = photosUpdate.find((x) => x.photoId === photoId);
        if (photoSelect) {
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
        // thay đổi logic cập nhật createPhotos (copy từ photos)
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

    setPhotos((prePhoto) => prePhoto.filter((photo, i) => i !== index));

    if (photoId > 0) {
      setPhotosUpdate((prevPhotosUpdate) =>
        prevPhotosUpdate.filter((photo) => photo.photoId !== photoId)
      );

      setPhotosDelete((prevPhotosDelete) => [
        ...prevPhotosDelete,
        {
          entityId: entityId,
          photoId: photoId,
        },
      ]);
    } else {
      setPhotosCreate((prevPhotosCreate) =>
        prevPhotosCreate.filter((photo, i) => i !== index)
      );
    }
  };

  const cud = async (entityId: string) => {
    if (photosCreate.length > 0) {
      const updatedPhotosCreate = photosCreate
        .filter((x) => x.photoId === 0)
        .map((photo) => {
          return {
            ...photo,
            entityId: entityId,
          };
        });
      if (updatedPhotosCreate.length > 0) {
        await fetchCreatePhoto(updatedPhotosCreate, token);
      }
    }
    if (photosUpdate.length > 0) {
      await fetchUpdatePhoto(photosUpdate, token);
    }
    if (photosDelete.length > 0) {
      await fetchDeletePhoto(photosDelete, token);
    }
  };

  return (
    <div className="flex flex-col px-6 py-4 gap-4">
      <h1 className="text-[082431] font-bold text-2xl opacity-80 text-center">
        {car?.carId != 0 ? "Edit Car" : "Add New Car"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 pt-6 px-2"
        method="POST"
      >
        <div className="flex items-center">
          <label
            htmlFor="make"
            className="block text-base font-medium leading-6 text-gray-900 w-1/5"
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
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">
                {car?.carId != 0 ? `${car?.make}` : "Select a brand..."}
              </option>
              {car?.carId == 0 && listBrands && (
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
              className="block w-full rounded-md border-0 py-1.5 px-3  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
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
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
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
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
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
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
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
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
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
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
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
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
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
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex relative h-[160px]">
            <label
              htmlFor="addMainImage"
              className="text-base font-medium leading-6 text-gray-900 w-[20%]"
            >
              Main Car Image
            </label>
            <div className="relative w-[80%]">
              <input
                id="mainImage"
                name="mainImage"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange(
                    e,
                    photos[0]?.photoId ?? 0,
                    car?.carId.toString() ?? "0",
                    1,
                    0
                  )
                }
                className="z-10 absolute w-[90%] h-full opacity-0 cursor-pointer"
              />
              {photos[0] ? (
                <div className="absolute w-full h-full border border-gray-400 flex items-center justify-center overflow-hidden">
                  <Image
                    src={getPhotoUrl(photos[0]) ?? "/loader.svg"}
                    alt="Main Image Car"
                    height={240}
                    width={240}
                    className="object-cover"
                  ></Image>
                  <button
                    className="z-20 absolute top-0 right-0 hover:bg-gray-600 bg-gray-300 text-black rounded-full w-10 h-10 flex items-center justify-center"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemovePhoto(
                        e,
                        car?.carId.toString() ?? "0",
                        photos[0].photoId ?? 0,
                        0
                      );
                    }}
                  >
                    <Image
                      src="/xmark.svg"
                      alt="remove"
                      width={16}
                      height={16}
                    ></Image>
                  </button>
                </div>
              ) : (
                <div className="absolute w-full h-full border border-gray-400 flex flex-col gap-4 items-center justify-center overflow-hidden">
                  <Image
                    src="/HandPointer.svg"
                    alt="Add"
                    height={70}
                    width={70}
                  ></Image>
                  <span className="text-base font-medium">
                    Choose main car image !
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex">
            <label
              htmlFor="addOthersImage"
              className="text-base font-medium leading-6 text-gray-900 w-[20%]"
            >
              Others Car Image
            </label>
            <div className="w-[80%] gap-4 flex flex-col">
              <div className="relative h-[140px]">
                <input
                  id="othersImage"
                  name="othersImage"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    handleFileChange(
                      e,
                      0,
                      car?.carId.toString() ?? "0",
                      1,
                      photos.length
                    );
                  }}
                  className="z-10 absolute w-full h-full opacity-0 cursor-pointer"
                />
                <div className="absolute w-full h-full border border-gray-400 flex flex-col gap-4 items-center justify-center overflow-hidden">
                  <Image
                    src="/HandPointer.svg"
                    alt="Add"
                    height={70}
                    width={70}
                  ></Image>
                  <span className="text-base font-medium">
                    Choose others car image !
                  </span>
                </div>
              </div>

              <div className="relative flex flex-wrap items-center gap-2">
                {photos.slice(1).map((photo, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 border border-gray-400 flex items-center justify-center overflow-hidden"
                  >
                    <input
                      id="othersImage"
                      name="othersImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        handleFileChange(
                          e,
                          photo?.photoId ?? 0,
                          car?.carId.toString() ?? "0",
                          1,
                          index + 1
                        );
                      }}
                      className="z-10 absolute w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="absolute top-0 w-full h-full flex items-center justify-center">
                      <Image
                        src={getPhotoUrl(photo) ?? "/loader.svg"}
                        alt="Others Image Car"
                        height={80}
                        width={80}
                        className="object-cover"
                      ></Image>
                      <button
                        className="z-20 absolute top-0 right-0 hover:bg-gray-600 bg-gray-300 text-black rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={(e) => {
                          handleRemovePhoto(
                            e,
                            car?.carId.toString() ?? "0",
                            photo.photoId ?? 0,
                            index + 1
                          );
                        }}
                      >
                        <Image
                          src="/xmark.svg"
                          alt="remove"
                          width={16}
                          height={16}
                        ></Image>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Link href="/pages/car">
            <CustomButton
              title={`Back`}
              textStyles="font-bold text-base"
              containerStyles="text-white border border-black rounded-md hover:bg-blue-700 bg-blue-500  w-[80px]"
            />
          </Link>
          <CustomButton
            title={`${car?.carId != 0 ? "Save" : "Add"}`}
            textStyles="font-bold text-base"
            btnType="submit"
            containerStyles="text-slate-700 border border-black hover:bg-slate-300 rounded-md bg-slate-100 w-[100px]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUpdateCar;
