"use server";

import { createClient } from "@/utils/supabase/server";

export async function verifyVoterPin(pin: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  if (pin === "123456") {
    return { success: true };
  }
  
  return {
    success: false,
    error: "PIN tidak terdaftar atau sudah digunakan. Silakan cek kembali.",
  };
}

export async function loginAdmin(formData: FormData) {
  const email = formData.get("username") as string;
  const password = formData.get("password") as string;

  console.log("🔍 Login attempt:", { email, passwordLength: password.length });

  if (!email || !password) {
    return { success: false, error: "Email dan password wajib diisi." };
  }

  try {
    const supabase = await createClient();

    const { data: authData, error: authError } = 
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      console.error("❌ Auth Error:", authError.message);
      return {
        success: false,
        error: "Kredensial salah atau akun tidak ditemukan.",
      };
    }

    console.log("✅ Auth success, user ID:", authData.user.id);

    const { data: adminData, error: adminError } = await supabase
      .from("admins")
      .select("role")
      .eq("id", authData.user.id)
      .single();

    if (adminError || !adminData) {
      console.error("❌ Admin check error:", adminError);
      await supabase.auth.signOut();
      return {
        success: false,
        error: "Akses ditolak. Anda bukan administrator resmi.",
      };
    }

    console.log("✅ Login successful, role:", adminData.role);
    return { success: true, role: adminData.role };
  } catch (err) {
    console.error("💥 System error:", err);
    return { success: false, error: "Terjadi kesalahan internal pada server." };
  }
}

export async function logoutAdmin() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return { success: true };
  } catch (err) {
    console.error("Kesalahan sistem saat logout:", err);
    return { success: false, error: "Gagal melakukan logout." };
  }
}