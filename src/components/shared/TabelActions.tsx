import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { Link } from "react-router-dom";

const actions = [
  {
    icon: <EyeOutlined />,
    type: "view",
  },
  {
    icon: <EditOutlined />,
    type: "edit",
  },
  {
    icon: <DeleteOutlined />,
    type: "delete",
  },
];

const TabelActions = ({
  module,
  id,
  onDelete,
}: {
  module: string;
  id: number;
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      {actions.map(({ icon, type }, indx) => (
        <div key={indx}>
          {type !== "delete" ? (
            <Link to={`/${module}/${type}/${id}`}>{icon}</Link>
          ) : (
            <Popconfirm
              title="Are you sure to delete this post?"
              onConfirm={() => onDelete(id)}
              okText="Yes"
              cancelText="No"
            >
              {icon}
            </Popconfirm>
          )}
        </div>
      ))}
    </div>
  );
};

export default TabelActions;
