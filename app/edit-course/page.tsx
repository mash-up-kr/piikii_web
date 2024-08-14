import React, { Suspense } from "react";

import EditCourse from "./_components/EditCourse";

const EditCoursePage = () => {
  return (
    <Suspense>
      <EditCourse />
    </Suspense>
  );
};

export default EditCoursePage;
