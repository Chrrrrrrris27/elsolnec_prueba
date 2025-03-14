export const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      {isLoading && (
        <div className="absolute overflow-hidden top-0 left-0 flex justify-center items-center w-full h-full z-50">
          <span className="block w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></span>
          <span className="hidden">loading</span>
        </div>
      )}
    </>
  );
};
