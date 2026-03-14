import React from "react";
import { useEffect, useState } from "react";
const ListData = () => {
    type User = {
        id: number;
        name: string;
    };

    const [data, setData] = useState<User[]>([]);

    const fetchData = async () => {
        try {
            const response = await fetch(
                "https://xay-dung-phan-mem-web-hs0s.onrender.com/users",
            );

            const result = await response.json();
            setData(result);
            console.log(result);
        } catch (error) {
            console.error("Lỗi fetch:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div>ListData</div>
            {data.map((item) => (
                <div key={item.id}>
                    <span>{item.id} </span>
                    <span>
                        <b className="" style={{ fontSize: "20px" }}>
                            {item.name}
                        </b>
                    </span>
                </div>
            ))}
        </>
    );
};

export default ListData;
