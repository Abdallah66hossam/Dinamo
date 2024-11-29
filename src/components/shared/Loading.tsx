import { Spin } from "antd";

const Loading = () => {
  return (
    <section className="fixed left-0 top-0 w-full h-screen flex items-center justify-center bg-white">
      <Spin size="large"></Spin>
    </section>
  );
};

export default Loading;
