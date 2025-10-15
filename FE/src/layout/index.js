import { Outlet, useLocation } from "react-router-dom";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { getToken } from "../services/localStorageService";
import { jwtDecode } from "jwt-decode";
import Header from "../components/header";

function AppLayout(){
    const location = useLocation();
    
    // Các trang không hiển thị header
    const pagesWithoutHeader = ['/login', '/register', '/admin'];
    const shouldShowHeader = !pagesWithoutHeader.some(page => location.pathname.startsWith(page));

    return (
        <Layout style={{ minHeight: "100vh", padding: 0, margin: 0 }}>
            <Layout style={{ padding: 0, margin: 0 }}>
                {/* Hiển thị Header cho các trang không phải login, register, admin */}
                {shouldShowHeader && <Header />}
                
                <Content style={{ 
                    margin: "0", 
                    padding: "0",
                    background: "transparent",
                    flex: 1
                }}>
                    <div>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default AppLayout;