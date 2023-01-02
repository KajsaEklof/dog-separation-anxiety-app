import { ref } from "vue";
import supabase from "~/utils/supabase";

export interface UserCredentials {
  email: string;
  password: string;
}


// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user
const user = ref(null);

export default function useAuthUser() {
  /**
     * Login with email and password
     */
  const login = async ({ email, password }: UserCredentials) => {
    console.log('login', email, password)

    if (!supabase) {
      return;
    }

    const { user, session, error } = await supabase.auth.signIn({ email, password });

    return { user, session, error }
  };

  /**
    * Check if user is logged in
  */
  const isLoggedIn = () => {
    return !!user.value;
  };


  /**
   * Logout
   */
  const logout = async () => {
    await supabase.auth.signOut();
  };


  /**
   * Register
   */
  const register = async ({ email, password }: UserCredentials) => {
    if (!supabase) {
      return;
    }

    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });

    return { user, session, error }
  };

  /**
   * Send user an email to reset their password
   * (ie. support "Forgot Password?")
   */
  const sendPasswordRestEmail = async (email: string) => {
    if (!supabase) {
      return;
    }

    const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);

    return { data, error }
  };

  return {
    user,
    login,
    // loginWithSocialProvider,
    isLoggedIn,
    logout,
    register,
    // update,
    sendPasswordRestEmail,
    // maybeHandleEmailConfirmation,
  };
}