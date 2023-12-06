import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
}
