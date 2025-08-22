import { useEffect, useState } from "react";
import { Table, Flex, Input, Typography, Button, Image } from "antd";
import type { TableProps, GetProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { fetchApi } from "./helpers/api";
import useDebounce from "./hooks/useDebounce";
export interface CommonResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface UserResponse {
  name: string;
  location: string;
  email: string;
  age: number;
  phone: string;
  cell: string;
  picture: string[];
}

const columns: TableProps<UserResponse>["columns"] = [
  {
    title: "Nama",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Umur",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Alamat",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Telepon 1",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Telepon 2",
    dataIndex: "cell",
    key: "cell",
  },
  {
    title: "Gambar",
    dataIndex: "picture",
    key: "picture",
    render: (_, record) => <Image src={record.picture[1]} alt="" width={50} height={50} />,
  },
];

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const { Title } = Typography;

const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value);

const App: React.FC = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [data, setData] = useState<UserResponse[]>([]);

  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const debouncedSearch = useDebounce(search, 300);
  async function fetchUsers() {
    const { data } = await fetchApi.get<CommonResponse<UserResponse[]>>("/users/random-user", {
      params: {
        result: 100,
        page: 1,
      },
    });
    setUsers(data.data);

    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setData(users);
    } else {
      const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      setData(filteredUsers);
    }
  }, [users, debouncedSearch]);

  return (
    <Flex gap="middle" vertical style={{ marginInline: "10px", marginBlock: "3px" }}>
      <Title level={5}>List</Title>
      <Flex gap="middle" justify="space-between" align="center">
        <Search
          placeholder="Search"
          allowClear
          onSearch={onSearch}
          style={{ width: 500 }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button shape="default" icon={<PlusOutlined />}>
          New Data
        </Button>
      </Flex>
      <Table<UserResponse>
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
        loading={loading}
        rowKey="name"
      />
    </Flex>
  );
};

export default App;
