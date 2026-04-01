import React from "react";
import { Icon } from "@iconify/react";
import {  Link } from "react-router-dom";

function Header() {

  const header: {name: string, path: string}[] = [ 
    {name: "Trang Chủ", path: "/"},
    {name: "Sản Phẩm", path: "/san-pham"},
    {name: "Dịch Vụ", path: "/dich-vu"},
    {name: "Giới Thiệu", path: "/gioi-thieu"},
    {name: "Liên Hệ", path: "/lien-he"},
    {name: "Đặt Lịch", path: "/dat-lich"},
    {name: "Tin Tức", path: "/tin-tuc"},
    {name: "Đánh Giá", path: "/danh-gia"}
  ]
  return (
    <>
    {/* introduce */}
      <div className="bg-[#F26924] py-4 px-30">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-lg">Nha Khoa Chúng Tôi</h2>
          <div className="flex items-center">
            <Icon icon="mdi:location" width="24" height="24" style={{ color: 'white' }} />
            <h4 className="text-sm text-white ">123 Đường ABC, Quận 8 , Thành phố Hồ Chí Minh</h4>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Icon icon="mdi:clock" width="24" height="24" style={{ color: 'white' }} />
              <p className="text-white">8:00-18:30</p>
            </div>
            <div className="flex items-center">
              <Icon icon="ic:baseline-phone" width="24" height="24" style={{ color: 'white' }} />
              <Link to="" className="text-white hover:underline">
                +8423 456 789
              </Link>
            </div>
            {/* social media */}
            <div className="flex items-center gap-0.5">
              <Link to= "" target="_blank" className="border rounded-sm bg-blue-900">  
                <Icon icon="ic:baseline-facebook" width="24" height="24" style={{ color: 'white' }} />
              </Link>
              <Link to= "" target="_blank" className="border rounded-sm bg-blue-900">
                <Icon icon="simple-icons:zalo" width="24" height="24" style={{ color: 'white' }}     />
              </Link>
              <Link to= "" target="_blank" className="border rounded-sm bg-blue-900">
                <Icon icon="ic:baseline-tiktok" width="24" height="24" style={{ color: 'white' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="px-30 bg-amber-200">
        <div className="flex  items-center justify-between">
          <div className="">
            <img src="../../assets/logo.jpg" alt="" className="Logo nha khoa" width={"100px"} height={"100px"} />
          </div>
          <div className="flex items-center justify-center gap-4">
            {header.map((item, index) => (
              <Link key={index} to={item.path} className="text-black hover:text-gray-500 mx-2">
                {item.name}
              </Link>
            ))}
          </div>
          {/* login/ logout */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Icon icon="mdi:user" width="24" height="24"/>
              <Link to="/login">Đăng Nhập</Link>
            </div>
            <div className="flex items-center">
              <Icon icon="streamline-freehand:content-write" width="24" height="24"   />
              <Link to="/logout">Đăng Ký</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
