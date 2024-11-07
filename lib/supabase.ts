import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nfujhnvihbmyxjnwfjkm.supabase.co";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
