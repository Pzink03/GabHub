
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/Button"
import { SignupValidationSchema } from "@/lib/validations"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import Loading from "@/components/Loading"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useToast } from "@/components/ui/use-toast"
import { useUserContext } from "@/context/AuthContext"


function SignupForm() {
  const { checkAuthUser } = useUserContext()
  const {toast} = useToast()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof SignupValidationSchema>>({
  resolver: zodResolver(SignupValidationSchema),
  defaultValues: {
    name: '',
    username: '',
    email: '',
    password: '',
  },
  })

  const {mutateAsync: createUserAccount, isPending: isCreatingAccount} = useCreateUserAccount()
  const {mutateAsync: signInAccount} = useSignInAccount()

async function onSubmit(values: z.infer<typeof SignupValidationSchema>) {
  const newUser = await createUserAccount(values)

  if(!newUser) {
    return toast({title: "Sign up failed. Please try again."})
  }

  const session = await signInAccount({
    email: values.email,
    password: values.password
  })
  if(!session) {
    return toast({title: "Sign up failed. Please try again."})
  }

  const isLoggedIn = await checkAuthUser()

  if(isLoggedIn) {
    form.reset()

    navigate('/')
  } else {
    return toast({title: "Sign up failed. Please try again."})
  }
  }

return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
              <img src="/assets/images/logolg.svg" width={600} height={500}  />
              <h2 className="h3-bold sm:h2-bold pt-4 sm:pt-12">Create a new account</h2>
              <p className="text-light-3 small-medium md:base-regular">To use GabHub please create an account</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-primary-500">
          {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loading /> Loading...
              </div>
          ): "Sign Up"}
          </Button>
          <p className=" text-small-regular text-dark-4 text-center mt-2">
              Already have an account?
              <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
          </p>
      </form>
      </div>
    </Form>
  )
}

export default SignupForm;
