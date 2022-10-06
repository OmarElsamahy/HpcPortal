export default function ({ auth, redirect, _route, _req }) {
  if (!auth.user) {
    return redirect("/api/auth/login");
  }
}