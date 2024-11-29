import { useParams } from "react-router-dom";
import useFetch from "../../services/useFetch";
import Loading from "../shared/Loading";

const PostView = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(`/posts/${id}`);

  if (loading) return <Loading />;
  return (
    <div className="text-black px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-10">
        {data?.title}
      </h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
        {data?.body}
      </p>
    </div>
  );
};

export default PostView;
