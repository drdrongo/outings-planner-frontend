import { Navigate, Outlet } from "react-router-dom";
import { IMe } from "../data/auth";

interface IProps {
  me: IMe;
  // children: ReactElement | null;
}

const ProtectedRoute = ({ me }: IProps) => {
  console.log(me.auth ? 'foo' : 'bar')
  return me.auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
