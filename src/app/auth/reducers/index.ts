import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../action-types';
import { User } from '../model/user.model';

export const authFeatureKey = 'auth';
export const initialAuthState: AuthState = {
  user: undefined
};

export interface AuthState {
  user: User
}

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      ...state,
      user: action.user
    };
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      ...state,
      user: undefined
    }
  })
);
