import { User, AuthError } from "@supabase/supabase-js";
import useSupabase from "./useSupabase";

const useAuth = () => {
  const user = useState<User | null>("user", () => null);
  const router = useRouter();
  const er = useState("error", () => "");
  const { supabase } = useSupabase();

  supabase.auth.onAuthStateChange((e, session) => {
    user.value = session?.user || null;
  });

  const signUp = async ({
    email,
    password,
    ...metadata
  }: {
    email: string;
    password: string;
  }) => {
    er.value = "";
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${window.location.origin}/profileee?source=email`,
      },
    });

    if (error) er.value = error.message;
    return data;
  };

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    er.value = "";
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) er.value = error.message;
    return data;
  };

  const signOut = async () => {
    er.value = "";
    const { error } = await supabase.auth.signOut();
    if (error) er.value = error.message;
    if (!error) router.push("/");
  };

  const isLoggedIn = () => {
    return !!user.value;
  };

  return { user, signUp, signIn, signOut, er, isLoggedIn };
};

export default useAuth;
