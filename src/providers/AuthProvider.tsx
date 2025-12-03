import { PropsWithChildren, use } from 'react';
import AuthJwtProvider, { AuthJwtContext } from './auth-provider/AuthJwtProvider';

const AuthMethodProvider = AuthJwtProvider;
const AuthMethodContext = AuthJwtContext;

const AuthProvider = ({ children }: PropsWithChildren) => {
  return <AuthMethodProvider>{children}</AuthMethodProvider>;
};

export const useAuth = () => use(AuthMethodContext);

export default AuthProvider;
