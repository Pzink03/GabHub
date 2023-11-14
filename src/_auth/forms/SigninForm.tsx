import React, { useState, useMemo } from "react";
import { checkEmail, checkName, checkPassword, checkUsername } from "./validators";
import { Button } from "../../components/Button";
import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useSignInAccount } from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";

function SigninForm() {
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext()

    const navigate = useNavigate()

    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState<boolean>(false);

    const {mutateAsync: signInAccount, isPending} = useSignInAccount()

  const emailErrors: string[] = useMemo(() => {
    return isAfterFirstSubmit ? checkEmail(email) : [];
  }, [isAfterFirstSubmit, email]);

  const passwordErrors: string[] = useMemo(() => {
    return isAfterFirstSubmit ? checkPassword(password) : [];
  }, [isAfterFirstSubmit, password]);


async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const userValues = {
        email: email,
        password: password
    }

    const session = await signInAccount({
        email: userValues.email,
        password: userValues.password



    })

    if(!session) return



    setIsAfterFirstSubmit(true);
    const nameResults = checkName(name)
    const usernameResults = checkUsername(username)
    const emailResults = checkEmail(email);
    const passwordResults = checkPassword(password);

    if (emailResults.length === 0 && passwordResults.length === 0 && nameResults.length === 0 && usernameResults.length === 0 ) {
      alert("Success");

    }

    const isLoggedIn = await checkAuthUser()

    if(isLoggedIn) {
        setName('')
        setEmail('')
        setPassword('')
        setUsername('')

        navigate('/')
    } else {
        console.log("youre a chode")
    }

  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 max-w-md">
        <div className="flex flex-center">
            <img src="/assets/images/logo.svg" width={600} height={500} />
        </div>
        <div className="sm:w-420 flex-center flex-col">

            <h2 className="h3-bold sm:h2-bold pt-4 sm:pt-12">Log in to your account</h2>
            <p className="text-light-3 small-medium md:base-regular">Welcome back! Please enter your account details</p>
        </div>
      <div className={`flex flex-col gap-2  ${emailErrors.length > 0 ? "error" : ""}`}>
        <label className="font-bold" htmlFor="email">
          Email
        </label>
        <input
          className="border-black rounded p-1 text-black"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailErrors.length > 0 && (
          <div className="msg">{emailErrors.join(", ")}</div>
        )}
      </div>
      <div className={`flex flex-col gap-2 ${passwordErrors.length > 0 ? "error" : ""}`}>
        <label className="font-bold" htmlFor="password">
          Password
        </label>
        <input
          className="border-black rounded p-1 text-black"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordErrors.length > 0 && (
          <div className="msg">{passwordErrors.join(", ")}</div>
        )}
      </div>
      <Button className="bg-purple-600">
        {isUserLoading ? (
            <div className="flex-center gap-2">
               <Loading /> Loading...
            </div>
        ): "Log In"}
        </Button>
        <p className=" text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign up</Link>

        </p>
    </form>
  );
}

export default SigninForm;
