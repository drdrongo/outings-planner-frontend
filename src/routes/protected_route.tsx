import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { IUser } from "../data/users";

interface IProps {
  me: IUser;
  children: ReactElement | null;
}

const ProtectedRoute = ({ me, children }: IProps) => {
  return me.auth ? children : <Navigate to="/"  />;
};

export default ProtectedRoute;
