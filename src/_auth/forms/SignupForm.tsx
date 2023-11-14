import React, { useState, useMemo } from "react";
import { checkEmail, checkName, checkPassword, checkUsername } from "./validators";
import { Button } from "../../components/Button";
import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserAccount, useSignInAccount } from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";

function StateForm() {
    const { checkAuthUser } = useUserContext()

    const navigate = useNavigate()

    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState<boolean>(false);

    const {mutateAsync: createUserAccount, isPending: isCreatingAccount} = useCreateUserAccount()
    const {mutateAsync: signInAccount} = useSignInAccount()

  const emailErrors: string[] = useMemo(() => {
    return isAfterFirstSubmit ? checkEmail(email) : [];
  }, [isAfterFirstSubmit, email]);

  const passwordErrors: string[] = useMemo(() => {
    return isAfterFirstSubmit ? checkPassword(password) : [];
  }, [isAfterFirstSubmit, password]);

  const nameErrors: string[] = useMemo(() => {
    return isAfterFirstSubmit ? checkName(name) : [];
  }, [isAfterFirstSubmit, name]);

  const usernameErrors: string[] = useMemo(() => {
    return isAfterFirstSubmit ? checkUsername(username) : [];
  }, [isAfterFirstSubmit, username]);

async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const userValues = {
        name: name,
        username: username,
        email: email,
        password: password
    }

    const newUser = await createUserAccount(userValues)

    if(!newUser) return

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
        <div className="sm:w-420 flex-center flex-col">
            <img src="/assets/images/logo.svg"  />
            <h2 className="h3-bold sm:h2-bold pt-4 sm:pt-12">Create a new account</h2>
            <p className="text-light-3 small-medium md:base-regular">To use Social Circle please enter your account details</p>
        </div>
        <div className={`flex flex-col gap-2  ${nameErrors.length > 0 ? "error" : ""}`}>
        <label className="font-bold" htmlFor="name">
        Name
        </label>
        <input
          className="border-black rounded p-1 text-black"
          type="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {usernameErrors.length > 0 && (
          <div className="msg">{usernameErrors.join(", ")}</div>
        )}
      </div>
        <div className={`flex flex-col gap-2  ${usernameErrors.length > 0 ? "error" : ""}`}>
        <label className="font-bold" htmlFor="username">
          Username
        </label>
        <input
          className="border-black rounded p-1 text-black"
          type="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>*This is your publicly displayed name</p>
        {emailErrors.length > 0 && (
          <div className="msg">{emailErrors.join(", ")}</div>
        )}
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
        {isCreatingAccount ? (
            <div className="flex-center gap-2">
               <Loading /> Loading...
            </div>
        ): "Sign Up"}
        </Button>
        <p className=" text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>

        </p>
    </form>
  );
}

export default StateForm;