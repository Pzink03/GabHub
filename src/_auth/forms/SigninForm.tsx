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
import { SigninValidationSchema } from "@/lib/validations"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import Loading from "@/components/Loading"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useToast } from "@/components/ui/use-toast"
import { useUserContext } from "@/context/AuthContext"


function SigninForm() {
  const { checkAuthUser } = useUserContext()
  const {toast} = useToast()
  const navigate = useNavigate()
  const {mutateAsync: signInAccount, isPending: isUserLoggingIn} = useSignInAccount()

  const form = useForm<z.infer<typeof SigninValidationSchema>>({
  resolver: zodResolver(SigninValidationSchema),
  defaultValues: {
    email: '',
    password: '',
  },
  })

async function onSubmit(values: z.infer<typeof SigninValidationSchema>) {
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
        <img src="/assets/images/logo.svg" width={600} height={500}  />
        <h2 className="h3-bold sm:h2-bold pt-4 sm:pt-12">Log in to your account</h2>
        <p className="text-light-3 small-medium md:base-regular">Welcome Back! Please enter your details</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
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
        <Button className="bg-purple-600">
          {isUserLoggingIn ? (
              <div className="flex-center gap-2">
                <Loading /> Loading...
              </div>
          ): "Sign in"}
          </Button>
          <p className=" text-small-regular text-light-2 text-center mt-2">
              Don't have an account?
              <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign up</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}
export default SigninForm;
