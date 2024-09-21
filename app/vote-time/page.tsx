import React, { Suspense } from "react";
import VoteTime from "./_components/VoteTime";

const VoteTimePage = () => {
  return (
    <Suspense>
      <VoteTime />
    </Suspense>
  );
};

export default VoteTimePage;
