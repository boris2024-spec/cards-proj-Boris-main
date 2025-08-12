import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCurrentUser } from "../users/providers/UserProvider";
import ROUTES from "../routes/routesDict";

export default function BusinessRoute({ children }) {
    const { user, token } = useCurrentUser();
    const isBiz = Boolean(user?.isBusiness ?? user?.biz ?? false);
    const location = useLocation();

    if (!token) {
        return <Navigate to={ROUTES.login} state={{ from: location }} replace />;
    }
    if (!isBiz) {
        return <Navigate to={ROUTES.root} replace />;
    }
    return children;
}
