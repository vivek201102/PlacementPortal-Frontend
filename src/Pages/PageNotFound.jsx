import { useRouteError } from "react-router-dom";

export default function PageNotFound() {
  const error = useRouteError();

  return (
    <div id="error-page" className="h-screen w-screen flex justify-center items-center">
      <div>
        <h1 className="text-5xl font-bold">Oops!</h1>
        <p className="my-2 text-gray-600 text-lg">Sorry, an unexpected error has occurred.</p>
        <p className="font-bold text-red-500">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}