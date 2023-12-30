import { Card, Skeleton } from "@nextui-org/react";

const SkeletonCard = () => {
  return (
    <Card
      className="flex flex-col justify-between rounded-xl  p-4 w-full h-full animation-div overflow-hidden"
      radius="lg"
    >
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
};

const skeleton = [...Array(5).keys()].map((i) => {
  return <SkeletonCard key={i} />;
});

const SkeletonLoading = () => {
  return <>{skeleton}</>;
};

export default SkeletonLoading;
