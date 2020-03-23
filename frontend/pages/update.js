import Link from "next/link";
import UpdateItem from "../components/UpdateItem";

const update = props => {
  //   console.log(props);

  return (
    <div>
      <UpdateItem itemId={props.query.id} />
    </div>
  );
};

export default update;
