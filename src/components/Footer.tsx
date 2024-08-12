
import React from "react";
import "../App.css";
import logo from "../images/logo4.png";
import { Button } from "@mui/material";

const Footer = () => {
  return (
    <div>
      <footer style={{ marginTop: "80px" }}>
        <div className='row'>
          <div className='col' style={{ width: "30%" }}>
            <div
              className='footer-logo'
              style={{ display: "flex", gap: "12px" }}>
              <img
                src={`${logo}`}
                alt=''
                width={90}
                style={{ borderRadius: "7px" }}
              />
              <div style={{ paddingTop: "10px" }}>
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Học Lập Trình Để Đi Làm
                </span>
              </div>
            </div>
            <div
              style={{
                lineHeight: "25px",
                fontSize: "15px",
                color: "#ccc",
                padding: "20px 0",
              }}>
              <div>Điện thoại: 0246.329.1102</div>
              <div>Email: contact@fullstack.edu.vn</div>
              <div>Số 11D, lô A10, khu đô thị Nam Trung</div>
              <div>Yên, Phường Yên Hòa, Quận Cầu Giấy, TP. Hà Nội</div>
            </div>
          </div>
          <div className='col' style={{ width: "16.66667%" }}>
            <div
              style={{
                paddingTop: "12px",
                fontWeight: "bold",
                paddingBottom: "15px",
              }}>
              VỀ FDEMY
            </div>
            <ul>
              <li>
                <a href=''>Giới thiệu</a>
              </li>
              <li>
                <a href=''>Liên hệ</a>
              </li>
              <li>
                <a href=''>Điều khoản</a>
              </li>
              <li>
                <a href=''>Bảo mật</a>
              </li>
              <li>
                <a href=''>Cơ hội việc làm</a>
              </li>
            </ul>
          </div>
          <div className='col' style={{ width: "16.66667%" }}>
            <div>
              <div
                style={{
                  paddingTop: "50px",
                  fontWeight: "bold",
                  paddingBottom: "15px",
                }}>
                SẢN PHẨM
              </div>
              <ul>
                <li>
                  <a href=''>Game Nester</a>
                </li>
                <li>
                  <a href=''>Game CSS Diner</a>
                </li>
                <li>
                  <a href=''>Game CSS Selectors</a>
                </li>
                <li>
                  <a href=''>Game Froggy</a>
                </li>
                <li>
                  <a href=''>Game Froggy Pro</a>
                </li>
                <li>
                  <a href=''>Game Scoops</a>
                </li>
              </ul>
            </div>
          </div>
          <div className='col' style={{ width: "16.66667%" }}>
            <div
              style={{
                paddingTop: "84px",
                fontWeight: "bold",
                paddingBottom: "15px",
              }}>
              CÔNG CỤ
            </div>
            <ul>
              <li>
                <a href=''>Tạo CV xin việc</a>
              </li>
              <li>
                <a href=''>Rút gọn liên kết</a>
              </li>
              <li>
                <a href=''>Clip-path maker</a>
              </li>
              <li>
                <a href=''>Snippet generator</a>
              </li>
              <li>
                <a href=''>CSS Grid generator</a>
              </li>
              <li>
                <a href=''>Cảnh báo sờ tay lên mặt</a>
              </li>
            </ul>
          </div>
          <div className='col' style={{ width: "34%" }}>
            <div
              style={{
                lineHeight: "26px",
                fontWeight: "bold",
                // paddingTop: "90px",
              }}>
              CÔNG TY CỔ PHẦN CÔNG <br /> NGHỆ GIÁO DỤC FDEMY
            </div>
            <div
              style={{
                color: "#ccc",
                paddingTop: "15px",
                lineHeight: "30px",
                fontSize: "15px",
              }}>
              <div>Mã số thuế: 0109922901</div>
              <div>Ngày thành lập: 04/03/2022</div>
              <div>
                Lĩnh vực: Công nghệ, giáo dục, lập trình. <br />
                Fdemyxây dựng và phát triển những sản <br /> phẩm mang lại giá trị
                cho cộng đồng.
              </div>
            </div>
          </div>
        </div>
        <div>
          <p style={{ textAlign: "center", padding: "20px 0" ,margin:0}}>
            © 2018 - 2024 FDEMY. Nền tảng học lập trình hàng đầu Việt Nam
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
