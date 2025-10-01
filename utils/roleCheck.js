// admin check function
export function isAdmin(req) {
    if (req.user == null) {
        return false; // No user is logged in
    }
    if (req.user.role !== "admin") {
        return false; // User is not an admin
    }
    return true; // User is an admin
}