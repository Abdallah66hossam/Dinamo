import { Form, Input, Button, message } from "antd";
import customFetch from "../../services/customFetch";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../services/useFetch";
import { useEffect } from "react";
import Loading from "../shared/Loading";

const AddPost = () => {
  const { id } = useParams();
  const { data, loading } = id
    ? useFetch(`posts/${id}`)
    : { data: null, loading: false };

  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && data) {
      form.setFieldsValue({
        title: data.title,
        body: data.body,
      });
    }
  }, [id, data, form]);

  const handleSubmit = async (values: { title: string; body: string }) => {
    let url = id ? `posts/${id}` : "posts";
    await customFetch(url, {
      body: values,
      method: id ? "PUT" : "POST",
    });

    message.success(
      id
        ? "The Post has been updated successfully!"
        : "The Post has been created successfully!"
    );
    navigate("/posts");
  };

  if (loading) return <Loading />;
  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please input your title!" }]}
      >
        <Input placeholder="Enter the title" />
      </Form.Item>

      <Form.Item
        name="body"
        label="Body"
        rules={[{ required: true, message: "Please input the body!" }]}
      >
        <Input.TextArea placeholder="Enter the body" rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {id ? "Update Post" : "Add Post"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddPost;
