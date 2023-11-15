import React, { useContext, useRef } from "react";
import Navbar from "../../layout/navbar";
import Myfuction from "../../components/myFuction";
import Mycar from "../../components/myCar";
import Timer from "../../components/timer";
import { MyContext } from "../../context";
import Profile from "../../components/profile";
import Calculation from "../../components/calculation";
import Card from "../../components/card";
import Avtar from "../../components/avtar";
import Items from "../../components/item";
import Listitems from "../../components/listitems";
import Cup from "../../components/cup";

const Home = () => {
  const { count, setCount } = useContext(MyContext);
  const inputRef = useRef(null);
  const focusInput = () => {
    inputRef.current.focus();
  };
  const incrementCount = () => {
    setCount(count + 1);
  };
  const person = {
    name: "sardar nadir",
    theme: {
      backgroundColor: "black",
      color: "pink",
    },
  };
  return (
    <div className="d-flex  flex-column justify-content-center">
      <Navbar />
      <h1>Learning react hooks</h1>

      <h1>Use state examples</h1>
      <Myfuction />
      <Mycar />
      <h1>use effect examples</h1>
      <Timer />
      <Calculation setCount={setCount} />

      <div>
        <input ref={inputRef} type="text" />
        <button onClick={focusInput}>Focus Input</button>
        <button onClick={incrementCount}>Increment Count</button>
        <p>Count: {count}</p>
      </div>
      {/* once again learing react jsx or js functionalitey learning */}

      <div className="d-flex gap-5 p-5" style={person.theme}>
        <h1>Hello my name is {person.name}</h1>
        <Profile /> <Profile /> <Profile />
        <Card>
          <Avtar
            size={100}
            person={{
              name: " sardar",
              imageId: "YfeOqp2",
            }}
          />
        </Card>
      </div>
      {/* conditional rendering */}

      <section>
        <h1>Conditional rendering</h1>

        <ul>
          <Items isValued={true} value="it is a correct list" />
          <Items isValued={false} value="this is not a condition" />
          <Items isValued={true} value="my name is sardar m nadir" />
        </ul>
      </section>

      <article>
        <h2>data conditionaly rendering dynamically</h2>
        <ul>{Listitems}</ul>
        <Cup guest={1} />
        <Cup guest={2} />
        <Cup guest={3} />
      </article>

      <div>
        <h1>passing props to the component</h1>
      </div>
    </div>
  );
};

export default Home;
