import Image from "next/image";
import Link from "next/link";
import React from "react";

const FoodCard = ({
  restaurantId,
  restaurantName,
  restaurantAddress,
  restaurantImage,
}) => {
  return (
    <Link href={`/restoran/${restaurantId}`}>
      <div className="w-96 bg-white rounded-lg cursor-pointer shadow-gray-200 shadow-lg transform transition duration-300 hover:scale-110">
        <div className="flex flex-col">
          <Image
            src={restaurantImage}
            className="w-full h-36 rounded-md object-cover"
            width={1920}
            height={1080}
            alt="Sate"
          />
          <div className="my-5 px-5">
            <p className="text-[#E07416] font-bold text-xl">{restaurantName}</p>
            <p className="mt-1.5 text-sm text-gray-600">{restaurantAddress}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FoodCard;
