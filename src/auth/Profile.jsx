import React, { useEffect } from "react";
import Logo from "../Logo";

import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SlideRuler from "tw-slide-ruler";

import { success, failure, loading, delay, calculateBMI } from "../utils";

export function withRouter(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
function Gender({ state, setState }) {
  return (
    <>
      <div className="flex flex-wrap justify-center mt-2 ">
        <label className="relative">
          <input
            type="radio"
            name="radio"
            className="peer absolute  h-0 -z-10 opacity-0"
            checked={state.gender == "M"}
            onClick={() => setState({ gender: "M" })}
            onChange={(e) => {}}
          />
          <span className="block cursor-pointer w-20 bg-white px-3 w py-1.5 relative ml-px text-center text-gray-800 shadow-sm ring-1 ring-gray-300 transition-colors ease-in-out rounded-l-md peer-checked:bg-blue-100 peer-checked:text-blue-600 peer-checked:ring-blue-500">
            Male
          </span>
        </label>
        <label className="relative">
          <input
            type="radio"
            name="radio"
            className="peer absolute w-0 h-0 -z-10 opacity-0"
            checked={state.gender == "F"}
            onClick={() => setState({ gender: "F" })}
            onChange={(e) => {}}
          />
          <span className="w-20 block cursor-pointer bg-white px-3 py-1.5 relative ml-px text-center text-gray-800 shadow-sm ring-1 ring-gray-300 transition-colors ease-in-out peer-checked:bg-blue-100 peer-checked:text-blue-600 peer-checked:ring-blue-500">
            Female
          </span>
        </label>
        <label className="relative">
          <input
            type="radio"
            name="radio"
            className="peer absolute w-0 h-0 -z-10 opacity-0"
            checked={state.gender == "O"}
            onClick={() => setState({ gender: "O" })}
            onChange={(e) => {}}
          />
          <span className="w-20 block cursor-pointer bg-white px-3 py-1.5 relative ml-px text-center text-gray-800 shadow-sm ring-1 ring-gray-300 transition-colors ease-in-out rounded-r-md peer-checked:bg-blue-100 peer-checked:text-blue-600 peer-checked:ring-blue-500">
            Other
          </span>
        </label>
      </div>
    </>
  );
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this._renderSlideRuler = this._renderSlideRuler.bind(this);

    this.age = React.createRef();
    this.weight = React.createRef();
    this.height = React.createRef();

    this.state = !location.href.includes("edit")
      ? {
          name: "",
          age: 25,
          weight: 50,
          height: 150,
          gender: "O",
        }
      : {
          name: localStorage.getItem("name"),
          age: parseInt(localStorage.getItem("age")),
          weight: parseFloat(localStorage.getItem("weight")),
          height: parseFloat(localStorage.getItem("height")),
          gender: localStorage.getItem("gender"),
        };
    this.state.loading = false;
  }

  componentDidMount() {
    this._renderSlideRuler();
  }

  _renderSlideRuler() {
    new SlideRuler({
      el: this.age.current,
      maxValue: 100,
      minValue: 18,
      currentValue: this.state.age,
      canvasWidth: 300,
      handleValue: (value) => this.setState({ age: value }),
      precision: 1,
    });
    new SlideRuler({
      el: this.weight.current,
      maxValue: 200,
      minValue: 10,
      currentValue: this.state.weight,
      canvasWidth: 300,
      handleValue: (value) => this.setState({ weight: value }),
      precision: 0.1,
    });

    new SlideRuler({
      el: this.height.current,
      maxValue: 300,
      minValue: 100,
      currentValue: this.state.height,
      canvasWidth: 300,
      handleValue: (value) => this.setState({ height: value }),
      precision: 1,
    });
  }
  handleChange(data) {
    this.setState(data);
  }

  setName(event) {
    this.setState({ name: event.target.value });
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    await delay(1500);
    axios
      .post(
        "/api/user/updateProfile",
        {
          name: this.state.name,
          age: this.state.age,
          weight: this.state.weight,
          height: this.state.height,
          gender: this.state.gender,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("access_token"),
          },
        }
      )
      .then(async (res) => {
        success("Profile saved!");
        await delay(1000);
        ["name", "age", "weight", "height", "gender"].forEach((field) =>
          localStorage.setItem(field, this.state[field])
        );
        calculateBMI(this.state.height, this.state.weight);
        this.props.navigate("/diet");
        this.props.navigate(0);
      })
      .catch((error) => {
        failure("Error saving profile...");
        this.setState({ loading: false });
        console.error(error);
      });
    await delay(3000);
    this.setState({ loading: false });
    return true;
  }

  render() {
    return (
      <>
        <ToastContainer />
        <section className=" bg-gray-900 min-h-screen">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Logo />
            <div className="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                  {!location.href.includes("edit")
                    ? "Complete your profile"
                    : "Edit profile"}
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={this.handleFormSubmit.bind(this)}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium  text-white"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className=" border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John doe"
                      required={true}
                      value={this.state.name}
                      onChange={this.setName.bind(this)}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <div className=" text-white ">
                      Age
                      <span className="font-bold pl-2">
                        {this.state.age}yrs
                      </span>
                    </div>
                    <div ref={this.age}></div>
                    <div className=" text-white ">
                      Weight
                      <span className="font-bold pl-2">
                        {this.state.weight} kg
                      </span>
                    </div>
                    <div ref={this.weight}></div>
                    <div className=" text-white">
                      Height
                      <span className="font-bold pl-2">
                        {this.state.height} cm
                      </span>
                    </div>
                    <div ref={this.height}></div>
                    <div className="text-white">Gender</div>
                    <Gender
                      state={this.state}
                      setState={this.handleChange.bind(this)}
                    />
                  </div>

                  <br />
                  <button
                    type="submit"
                    className="w-full  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                  >
                    {loading(
                      this.state.loading,
                      <span className="text-white">Save</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(Profile);
