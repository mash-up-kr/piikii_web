import React, { Suspense } from "react";
import AddPlaceDetail from "./_components/AddPlaceDetail";

const AddDetailPage = () => {
  return (
    <Suspense>
      <AddPlaceDetail />
    </Suspense>
  );
};

export default AddDetailPage;
