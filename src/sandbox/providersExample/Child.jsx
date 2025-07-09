import GrandChild from "./GrandChild";

function Child({ message }) {
  return (
    <div>
      <p>This is Child component</p>
      <GrandChild message={message} />
    </div>
  );
}

export default Child;
