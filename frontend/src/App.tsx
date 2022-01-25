import React, { useEffect, useState } from "react";
import "./App.css";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBInputGroup,
  MDBInput,
  MDBInputGroupText,
  MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios";

function App() {
  const [autoRequest, setAutoRequest] = useState(false);
  const [original, setOriginal] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState("");

  const talkWithBackend = async () => {
    if (original === "" || percentage === "") {
      return Promise.resolve();
    }
    if (+original < 0 || +percentage < 0 || +percentage > 100) {
      Promise.reject(new Error("Invalid numbers."));
    }
    let response;
    try {
      response = await axios.post("/api/", { original, percentage });
      if (response.status === 200) {
        const answer: string = response.data.result;
        setResult(answer);
        return Promise.resolve();
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(new Error("Could not talk with backend."));
    }
    return Promise.reject(new Error("Failed."));
  };

  const autoUpdate = async () => {
    if (+original < 0 || +percentage < 0) {
      console.log("Note that negative numbers shouldn't be a thing. But the spec doesn't mention a thing about it.");
    }
    if (autoRequest) {
      await talkWithBackend();
    } else {
      return;
    }
  };

  useEffect(() => {
    autoUpdate();
  }, [original, percentage]);

  // const easyCalculate = () => {
  //   let result = Math.round((+original * ((100 - +percentage) / 100) + Number.EPSILON) * 100) / 100;
  //   // console.log(result);
  //   setResult(result.toString());
  // }

  return (
    <div className="App">
      <header>
        <MDBNavbar expand="lg" light bgColor="white">
          <MDBContainer fluid>
            <MDBNavbarToggler
              aria-controls="navbarExample01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <MDBIcon fas icon="bars" />
            </MDBNavbarToggler>
            <div className="collapse navbar-collapse" id="navbarExample01">
              <MDBNavbarNav right className="mb-2 mb-lg-0">
                <MDBNavbarItem active>
                  <MDBNavbarLink aria-current="page" href="#">
                    Home
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="#">Portfolio</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="#">Résumé</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="#">About Me</MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </div>
          </MDBContainer>
        </MDBNavbar>
      </header>
      <div className="p-5 text-center bg-light">
        <h1 className="mb-3">For SecDim Interview</h1>
        <h4 className="mb-3">
          Also, to be reused someday when I finally get around to writing my own
          website.
        </h4>
      </div>
      <div className="container">
        <MDBContainer fluid className="text-center">
          <form>
            <MDBInputGroup>
              <MDBInput
                label="Original integer"
                id="originalInteger"
                type="number"
                value={original}
                onChange={async (e: {
                  target: { value: React.SetStateAction<string> };
                }) => {
                  if (+e.target.value < 0) {
                    return;
                  }
                  setOriginal(e.target.value);
                }}
              />
              <MDBInputGroupText>/</MDBInputGroupText>
              <MDBInput
                label="Percentage as integer"
                id="percentageAsIntegerOutOf100"
                type="number"
                value={percentage}
                onChange={async (e: {
                  target: { value: React.SetStateAction<string> };
                }) => {
                  if (+e.target.value < 0 || +percentage > 100) {
                    setPercentage("100");
                    return;
                  }
                  setPercentage(e.target.value);
                }}
              />
              <MDBInputGroupText
                onClick={() => {
                  talkWithBackend();
                }}
              >
                =
              </MDBInputGroupText>
              <MDBInput
                label="Percentage off"
                id="formControlReadOnly"
                type="number"
                value={result}
                readonly
              />
              <MDBCheckbox
                className="text-center align-self-center justify-self-center"
                name="flexCheck"
                defaultChecked={autoRequest}
                id="flexCheckChecked"
                label="Automatically Evaluate"
                onChange={() => {
                  setAutoRequest(!autoRequest);
                }}
              />
              <MDBBtn
                onClick={(e: { preventDefault: () => void; }) => {
                  e.preventDefault();
                  talkWithBackend();
                }}
              >
                Evaluate
              </MDBBtn>
            </MDBInputGroup>
          </form>
        </MDBContainer>
      </div>
    </div>
  );
}

export default App;
