import { jwtDecode } from "jwt-decode";
import { getToken } from "../../services/localStorageService";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutesAdmin() {
  const token = getToken();

  if (!token) {
    // Không có token => quay lại trang login
    console.log("PrivateRoutesAdmin: Không có token, chuyển về login");
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    
    // Kiểm tra token đã hết hạn chưa
    if (decoded.exp * 1000 < Date.now()) {
      console.log("PrivateRoutesAdmin: Token đã hết hạn, xóa và chuyển về login");
      localStorage.removeItem('token');
      return <Navigate to="/login" replace />;
    }

    const userRole = decoded.scope?.name;
    
    console.log("PrivateRoutesAdmin: User role:", userRole);

    if (userRole === "ADMIN") {
      console.log("PrivateRoutesAdmin: User có quyền ADMIN, cho phép truy cập");
      return <Outlet />;
    } else {
      console.log("PrivateRoutesAdmin: User không có quyền ADMIN, chuyển về home");
      // Thêm alert để thông báo cho user
      alert("Bạn không có quyền truy cập trang quản trị! Chỉ có Admin mới được phép.");
      return <Navigate to="/home" replace />;
    }
  } catch (error) {
    console.error("PrivateRoutesAdmin: Lỗi giải mã token:", error);
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
}