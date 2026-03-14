import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
};

const ListData = () => {
    const [data, setData] = useState<User[]>([]);
    const [newName, setNewName] = useState("");

    const [editId, setEditId] = useState<number | null>(null);
    const [editName, setEditName] = useState("");

    const API = "https://xay-dung-phan-mem-web-hs0s.onrender.com/users";

    const fetchData = async () => {
        try {
            const response = await fetch(API);
            const result: User[] = await response.json();
            setData(result);
        } catch (error) {
            console.error("Lỗi fetch:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // THÊM USER
    const handleAdd = async () => {
        if (!newName) return;

        try {
            await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: newName,
                }),
            });

            setNewName("");
            fetchData();
        } catch (error) {
            console.error("Lỗi thêm:", error);
        }
    };


    const handleDelete = async (id: number) => {
        try {
            await fetch(`${API}/${id}`, {
                method: "DELETE",
            });

            setData(data.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Lỗi xóa:", error);
        }
    };

    const handleEdit = (user: User) => {
        setEditId(user.id);
        setEditName(user.name);
    };


    const handleUpdate = async () => {
        try {
            await fetch(`${API}/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: editName,
                }),
            });

            setEditId(null);
            fetchData();
        } catch (error) {
            console.error("Lỗi update:", error);
        }
    };

    return (
        <>
            <h2>Danh Sách User</h2>

            {/* THÊM USER */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    placeholder="Nhập tên user..."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />

                <button onClick={handleAdd} style={{ marginLeft: "10px" }}>
                    Thêm
                </button>
            </div>

            {/* DANH SÁCH */}
            {data.map((item) => (
                <div key={item.id} style={{ marginBottom: "10px" }}>
                    <span>{item.id} </span>

                    {editId === item.id ? (
                        <>
                            <input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                            />

                            <button onClick={handleUpdate}>Lưu</button>
                        </>
                    ) : (
                        <b style={{ fontSize: "18px" }}>{item.name}</b>
                    )}

                    <button
                        onClick={() => handleEdit(item)}
                        style={{ marginLeft: "10px" }}
                    >
                        Sửa
                    </button>

                    <button
                        onClick={() => handleDelete(item.id)}
                        style={{ marginLeft: "10px", color: "red" }}
                    >
                        Xóa
                    </button>
                </div>
            ))}
        </>
    );
};

export default ListData;
