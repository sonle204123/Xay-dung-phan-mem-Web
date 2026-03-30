import { Link } from "react-router-dom";
const Data = () => {
    return (
        <div
            style={{
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div style={{ fontSize: "20px" }}>Danh Sách User</div>

            <Link to="/users"  className="text-3xl">
                Link Danh Sách
            </Link>
        </div>
    );
};

export default Data;
