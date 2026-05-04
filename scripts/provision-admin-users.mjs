/**
 * Create or update auth users and ensure admin in public.user_roles.
 * Usage (from project root):
 *   node --env-file=.env scripts/provision-admin-users.mjs <email> <password> [<email> <password> ...]
 * Requires SUPABASE_SERVICE_ROLE_KEY and VITE_SUPABASE_URL (or SUPABASE_URL) in .env
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env (not VITE_ for the service key).");
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const pairs = [];
for (let i = 2; i < process.argv.length; i += 2) {
  const email = process.argv[i];
  const password = process.argv[i + 1];
  if (!email || !password) break;
  pairs.push({ email: email.trim().toLowerCase(), password });
}

if (pairs.length === 0) {
  console.error(
    "Usage: node --env-file=.env scripts/provision-admin-users.mjs <email> <password> [<email> <password> ...]"
  );
  process.exit(1);
}

async function findUserIdByEmail(email) {
  let page = 1;
  const perPage = 1000;
  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const u = data.users.find((x) => x.email?.toLowerCase() === email);
    if (u) return u.id;
    if (data.users.length < perPage) return null;
    page += 1;
  }
}

async function ensureAuthUser(email, password) {
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (!error && data.user) {
    console.log("Created user:", email);
    return data.user.id;
  }
  const errMsg = (error?.message || "").toLowerCase();
  if (
    errMsg.includes("already") ||
    errMsg.includes("registered") ||
    errMsg.includes("exists")
  ) {
    const id = await findUserIdByEmail(email);
    if (!id) throw new Error(`User exists but could not list: ${email}`);
    const { error: uerr } = await admin.auth.admin.updateUserById(id, {
      password,
      email_confirm: true,
    });
    if (uerr) throw uerr;
    console.log("Updated password for:", email);
    return id;
  }
  throw error;
}

async function ensureAdminRow(userId) {
  const { data: row } = await admin
    .from("user_roles")
    .select("id")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (row) return;
  const { error } = await admin
    .from("user_roles")
    .insert({ user_id: userId, role: "admin" });
  if (error) throw error;
  console.log("Granted admin role for user_id:", userId);
}

for (const { email, password } of pairs) {
  const id = await ensureAuthUser(email, password);
  await ensureAdminRow(id);
}

console.log("Done.");
