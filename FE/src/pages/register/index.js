
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Eye, 
  EyeOff, 
  User, 
  Lock, 
  Mail, 
  Phone, 
  UserPlus,
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Sparkles
} from "lucide-react";
import "./styles.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check password match in real time
    if (name === "confirmPassword" || name === "password") {
      const password = name === "password" ? value : formData.password;
      const confirmPassword = name === "confirmPassword" ? value : formData.confirmPassword;
      setPasswordMatch(password === confirmPassword || confirmPassword === "");
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Vui lòng nhập họ tên");
      return false;
    }
    if (!formData.username.trim() || formData.username.length < 3) {
      setError("Tên đăng nhập phải có ít nhất 3 ký tự");
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Email không hợp lệ");
      return false;
    }
    if (!formData.phone.trim() || !/^[0-9]{10,11}$/.test(formData.phone)) {
      setError("Số điện thoại không hợp lệ");
      return false;
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/v1/users/register", {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (response.data?.code === 1000) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.data?.message || "Đăng ký thất bại. Vui lòng thử lại!");
      }
    } catch (err) {
      console.error("Register error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  if (success) {
    return (
      <div className="ant-register-container">
        <div className="ant-register-wrapper">
          <div className="ant-register-card">
            <div className="ant-success-animation">
              <div className="ant-success-circle">
                <CheckCircle size={60} />
              </div>
              <h1 className="ant-success-title">Đăng ký thành công!</h1>
              <p className="ant-success-description">
                Tài khoản của bạn đã được tạo thành công. Đang chuyển hướng đến trang đăng nhập...
              </p>
              <div className="ant-loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ant-register-container">
      <div className="ant-register-wrapper">
        <div className="ant-register-card">
          {/* Back Button */}
          <button className="ant-back-button" onClick={handleBackToLogin}>
            <ArrowLeft size={16} />
            <span>Quay lại đăng nhập</span>
          </button>

          <div className="ant-card-header">
            <div className="ant-logo-container">
              <div className="ant-logo ant-logo-register">
                <UserPlus size={40} />
                <div className="ant-logo-sparkles">
                  <Sparkles size={16} className="sparkle-1" />
                  <Sparkles size={12} className="sparkle-2" />
                  <Sparkles size={14} className="sparkle-3" />
                </div>
              </div>
            </div>
            <h1 className="ant-card-title">Tạo tài khoản mới</h1>
            <p className="ant-card-description">
              Tham gia cộng đồng và khám phá những trải nghiệm tuyệt vời
            </p>
          </div>

          <div className="ant-card-content">
            {error && (
              <div className="ant-alert ant-alert-error">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="ant-register-form">
              {/* Full Name */}
              <div className="ant-form-item">
                <label htmlFor="fullName" className="ant-form-label">
                  Họ và tên
                </label>
                <div className="ant-input-wrapper">
                  <User size={16} className="ant-input-prefix" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Nhập họ và tên đầy đủ"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="ant-input"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="ant-form-item">
                <label htmlFor="username" className="ant-form-label">
                  Tên đăng nhập
                </label>
                <div className="ant-input-wrapper">
                  <User size={16} className="ant-input-prefix" />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Nhập tên đăng nhập (ít nhất 3 ký tự)"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="ant-input"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="ant-form-item">
                <label htmlFor="email" className="ant-form-label">
                  Email
                </label>
                <div className="ant-input-wrapper">
                  <Mail size={16} className="ant-input-prefix" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="ant-input"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="ant-form-item">
                <label htmlFor="phone" className="ant-form-label">
                  Số điện thoại
                </label>
                <div className="ant-input-wrapper">
                  <Phone size={16} className="ant-input-prefix" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="0123456789"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="ant-input"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="ant-form-item">
                <label htmlFor="password" className="ant-form-label">
                  Mật khẩu
                </label>
                <div className="ant-input-wrapper">
                  <Lock size={16} className="ant-input-prefix" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="ant-input"
                  />
                  <button
                    type="button"
                    className="ant-input-suffix"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="ant-form-item">
                <label htmlFor="confirmPassword" className="ant-form-label">
                  Xác nhận mật khẩu
                </label>
                <div className={`ant-input-wrapper ${!passwordMatch ? 'ant-input-error' : ''}`}>
                  <Lock size={16} className="ant-input-prefix" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="ant-input"
                  />
                  <button
                    type="button"
                    className="ant-input-suffix"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {!passwordMatch && formData.confirmPassword && (
                  <div className="ant-form-error">
                    Mật khẩu xác nhận không khớp
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className={`ant-btn ant-btn-primary ant-btn-register ${loading ? 'ant-btn-loading' : ''}`}
                disabled={loading}
              >
                {loading && <div className="ant-loading-spinner"></div>}
                <UserPlus size={16} />
                {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
              </button>
            </form>

            <div className="ant-signup-link">
              Đã có tài khoản? <a href="/login" className="ant-link">Đăng nhập ngay</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register