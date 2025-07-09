import { useSpecialMessage } from "../providers/SpecialMessageProvider";

function GrandChild({ message }) {
  const specialMessage = useSpecialMessage();
  return (
    <div>
      <p>This is GrandChild component</p>
      <h6>This is message from parent: {message}</h6>
      <h5>The data from the context is: {specialMessage}</h5>
    </div>
  );
}

export default GrandChild;
