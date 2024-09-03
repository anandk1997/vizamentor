import React from "react";

interface IProps {
  imageUrl: string;
  title: string;
  amount: string;
  duration: string;
  highlighted: boolean;
  buy: any;
}

function DestinationCard({
  imageUrl,
  title,
  amount,
  duration,
  highlighted,
  buy,
}: IProps) {
  return (
    <div className="flex relative flex-col justify-between  pb-[2.63rem] group">
      <div className="  object-fill ">
        <img
          src={imageUrl}
          alt="destination image"
          className="w-[314px] h-[20.43rem]  object-cover rounded-t-[1.5rem]"
        />
      </div>
      <div className="bg-white w-full mt-[1.69rem] px-[1.62rem]  group-hover:shadow-md pb-[2rem] group-hover:rounded-[1.5rem]">
        <div className="flex justify-end pr-3">
          <span className="bg-red-700 rounded-full px-2 py-1 text-white text-sm">
            Deal of day
          </span>
        </div>

        <div className="flex justify-between text-lightGray text-[1.125rem] font-bold gap-2">
          <p>{title}</p>
          <span className="text-red-700">- 50%</span>
          <span>
            <p>{amount}</p>
            <span className="flex gap-1">
              <span className="">MRP:</span>
              <span className="line-through font-thin ">
                ₹{parseInt(amount?.split(" ")[1]) * 2}
              </span>
            </span>
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <img src="/images/send-icon.png" alt="send icon" />
          </div>
          <p className="text-lightGray font-bold">{duration}</p>
        </div>

        <button
          className="bg-[black] hover:bg-[black]/90 text-white mx-auto text-sm md:text-base transition font-medium duration-200 h-10 rounded-lg px-8 flex items-center justify-center"
          style={{
            boxShadow:
              "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset",
          }}
          onClick={buy}
        >
          Buy Now
        </button>
      </div>
      {highlighted && (
        <div className="absolute bottom-[5rem] right-[-4rem] -z-10 hidden md:block">
          <img src="/images/stylish-ring.png" alt="curly ring" />
        </div>
      )}
    </div>
  );
}

export default DestinationCard;
