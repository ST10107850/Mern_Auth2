import React from "react";
import { ClipLoader } from "react-spinners";

interface LoaderProps {
  loading: boolean; // This prop will determine whether the spinner is visible or not
}

export const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <ClipLoader color="#FF5733" loading={loading} size={50} />
    </div>
  );
};
