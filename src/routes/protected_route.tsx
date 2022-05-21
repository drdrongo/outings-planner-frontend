import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { IMe } from "../data/auth";

interface IProps {
  me: IMe;
  children: ReactElement | null;
}

const ProtectedRoute = ({ me, children }: IProps) => {
  return me.auth ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
