import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { IUser } from "../data/users";

interface IProps {
  me: IUser;
  children: ReactElement | null;
  loaded: boolean;
}

const ProtectedRoute = ({ me, loaded, children }: IProps) => {
  if (!loaded) return children; // stops immediate navigation when we are waiting for the JWT validity check

  return me.auth ? children : <Navigate to="/"  />;
};

export default ProtectedRoute;
