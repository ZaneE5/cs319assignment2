import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();
const [dataF, setDataF] = useState({});
const [viewer, setViewer] = useState(0);

function App() {
  return (
    <div>
      <h1>Payment summary:</h1>
      <h3>{dataF.fullName}</h3>
      <p>{dataF.email}</p>
      <p>{dataF.creditCard}</p>
      <p>{dataF.address}</p>
      <p>{dataF.address2}</p>
      <p>
        {dataF.city},{dataF.state} {dataF.zip}{" "}
      </p>
      <button onClick={updateHooks} className="btn btn-secondary">
        Submit
      </button>
    </div>
  );


function Summary() {
  const updateHooks = () => {
    setViewer(0);
    setDataF({});
  };

  return (
    <div>
      (viewer === 0 && <Payment />) (viewer === 1 && <Summary />)
    </div>
  );
  }
}
export default App;

function Payment() {
  <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
    <div className="form-group">
      <input
        {...register("fullName", { required: true })}
        placeholder="Full Name"
        className="form-control"
      />
      {errors.fullName && <p className="text-danger">Full Name is required.</p>}
    </div>

    <input
      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      placeholder="Email"
    />
    {errors.email && <p>Email is required.</p>}
    <input
      {...register("creditCard", { required: true })}
      placeholder="Credit Card"
    />
    {errors.creditCard && <p>Credit Card is required.</p>}
    <input {...register("address", { required: true })} placeholder="Address" />
    {errors.address && <p>Address is required.</p>}
    <input {...register("address2")} placeholder="Address 2" />
    <input {...register("city", { required: true })} placeholder="City" />
    {errors.city && <p>City is required.</p>}
    <input {...register("state", { required: true })} placeholder="State" />
    {errors.state && <p>State is required.</p>}
    <input {...register("zip", { required: true })} placeholder="Zip" />
    {errors.zip && <p>Zip is required.</p>}

    <button type="submit" className="btn btn-primary">
      order
    </button>
  </form>;

  const onSubmit = (data) => {
    console.log(data);
    console.log(data.fullname);
    // update hooks
    setDataF(data);
    setViewer(1);
  };

  return <div></div>;
}
