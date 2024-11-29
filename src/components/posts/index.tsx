import { message, Table, TableProps, Tooltip } from "antd";
import TabelActions from "../shared/TabelActions";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useFetch from "../../services/useFetch.tsx";
import Loading from "../shared/Loading.tsx";
import customFetch from "../../services/customFetch.ts";

export interface PostsTypes {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export default function Posts() {
  const { data, loading, setData } = useFetch("posts");

  const deletePost = async (id: number) => {
    await customFetch(`/posts/${id}`, { method: "DELETE" });

    const updatedData = data.filter((post: PostsTypes) => post.id !== id);
    setData(updatedData);
    message.success("The Post has been deleted successfully!");
  };

  const tableColumns: TableProps<PostsTypes>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => (
        <span className="text-blue-900 font-bold text-sm">{text}</span>
      ),
    },
    {
      title: "Content",
      dataIndex: "body",
      key: "body",
      render: (text: string | undefined) => {
        const displayText = text || "";
        return (
          <Tooltip title={displayText}>
            <span className="text-zinc-900 font-bold text-sm">
              {displayText.slice(0, 100) +
                (displayText.length >= 100 ? "..." : "")}
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: "",
      key: "operation",
      fixed: "right",
      render: (_: any, record: PostsTypes) => (
        <TabelActions module={"posts"} id={record.id} onDelete={deletePost} />
      ),
    },
  ];

  if (loading) return <Loading />;
  return (
    <div className="overflow-auto">
      <div className="flex items-center justify-between text-white flex-wrap gap-2">
        <h1 className="text-[40px] font-semibold text-black/80">Posts</h1>
        <Link
          to={"/posts/add"}
          className="bg-blue-400 font-semibold px-5 py-2 rounded-xl hover:bg-white hover:text-blue-500 border border-blue-400 duration-300 gap-2 flex items-center"
        >
          <PlusOutlined />
          Add Post
        </Link>
      </div>
      <Table
        className="w-full table pt-14"
        dataSource={data}
        columns={tableColumns}
        pagination={false}
        loading={loading}
        rowKey={(record: PostsTypes) => record.id.toString()}
      />
    </div>
  );
}
