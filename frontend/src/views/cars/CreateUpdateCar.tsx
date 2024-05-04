"use client";
import { useEffect, useRef, useState } from "react";
import {
  createUploadPhotoPromises,
  fetchBrands,
  fetchCreatePhoto,
  fetchDeletePhoto,
  fetchUpdatePhoto,
  getPhotoUrl,
} from "@/src/utils";
import {
  BrandProps,
  UploadPhoto,
  CreatePhoto,
  UpdatePhoto,
  DeletePhoto,
  CarProps,
} from "@/src/types";
import { useStore } from "@/src/components/Store";
import { CustomButton } from "@/src/components";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

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

  const [countPhoto, setCountPhoto] = useState(4);

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
        <div className="flex items-center">
          <label
            htmlFor="addImage"
            className="block text-base font-medium leading-6 text-gray-900 w-[20%]"
          >
            Image
          </label>
          <div className="flex w-[80%] gap-1">
            {Array.from({ length: countPhoto }).map((_, index) => {
              const currentPhoto = photos[index];
              return (
                <div key={index} className="w-24 h-24">
                  <input
                    id={`photos${index}`}
                    name={`photos${index}`}
                    type="file"
                    accept="photos/*"
                    onChange={(e) => {
                      e.preventDefault();
                      handleFileChange(
                        e,
                        currentPhoto?.photoId ?? 0,
                        car?.carId.toString() ?? "0",
                        1,
                        index
                      );
                    }}
                    className="w-full h-full opacity-0 cursor-pointer"
                  />
                  {currentPhoto ? (
                    <>
                      <img
                        src={getPhotoUrl(currentPhoto) ?? "/loader.svg"}
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
                    <div className="w-24 h-24 border border-gray-400 flex items-center justify-center overflow-hidden">
                      <img src="/Plus.svg" alt="Add" />
                    </div>
                  )}
                </div>
              );
            })}
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

// <div className="flex items-center">
//   <label
//     htmlFor="addImage"
//     className="block text-base font-medium leading-6 text-gray-900 w-[20%]"
//   >
//     Image
//   </label>
//   <div className="flex w-[80%] gap-1">
//     {Array.from({ length: countPhoto }).map((_, index) => {
//       const currentPhoto = photos[index];
//       return (
//         <div key={index} className="w-24 h-24">
//           <input
//             id={`photos${index}`}
//             name={`photos${index}`}
//             type="file"
//             accept="photos/*"
//             onChange={(e) =>
//               handleFileChange(
//                 e,
//                 currentPhoto?.photoId ?? 0,
//                 car?.carId.toString() ?? "0",
//                 1,
//                 index
//               )
//             }
//             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//           />
//           {currentPhoto ? (
//             <>
//               <img
//                 src={getPhotoUrl(currentPhoto) ?? "/loader.svg"}
//                 alt={`Photo ${index + 1}`}
//                 className="w-24 h-24 object-cover rounded-md border border-gray-400"
//               />
//               <button
//                 className="absolute top-[-1px] right-[-1px] bg-gray-300 text-black rounded-full w-6 h-6 flex items-center justify-center"
//                 onClick={(e) => {
//                   handleRemovePhoto(
//                     e,
//                     car?.carId.toString() ?? "0",
//                     currentPhoto.photoId ?? 0,
//                     index
//                   );
//                 }}
//               >
//                 X
//               </button>
//             </>
//           ) : (
//             <div className="w-24 h-24 border border-gray-400 flex items-center justify-center overflow-hidden">
//               <img src="/Plus.svg" alt="Add" />
//             </div>
//           )}
//         </div>
//       );
//     })}
//   </div>
// </div>;
